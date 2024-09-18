<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { Header } from '@/components/ui/header'
import { Pizza, CirclePlus, Trash, CheckCheck, RotateCcw, CircleMinus } from 'lucide-vue-next'
import { useItems } from '@/stores/items'
import { storeToRefs } from 'pinia'
import Button from '@/components/ui/button/Button.vue'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import ItemCategory from '@/components/menu/item-category.vue'
import CreateNewCategory from '@/components/menu/create-new-category.vue'

const showCreateCategory = ref(false)

const toogleCreateCategory = () => {
	showCreateCategory.value = !showCreateCategory.value
}

const itemsStore = useItems()

const { items, selectedItems } = storeToRefs(itemsStore)

const displayActionButton = computed(() => {
	return selectedItems.value.length > 0
})

const selectedItemsNumber = computed(() => {
	return `Tanlandi: <b>${selectedItems.value.length}</b> ta element`
})

onMounted(async () => {
	await itemsStore.getAllItems()
})

const deleteAll = () => {
	console.log('deleted')
}
</script>

<template>
	<div class="menu-page">
		<div class="titles flex flex-wrap gap-10 items-center justify-between">
			<Header variant="default"> <Pizza class="sm:w-7 sm:h-7 h-5 w-5 mr-4" /> Menu </Header>
			<span
				v-show="displayActionButton"
				class="opacity-50 text-neutral-900 dark:text-neutral-50"
				v-html="selectedItemsNumber"
			></span>
			<div class="buttons flex items-center space-x-4 flex-wrap">
				<AlertDialog>
					<AlertDialogTrigger as-child>
						<Button size="icon" v-show="displayActionButton" variant="destructive"
							><Trash class="w-4 h-4" />
						</Button>
					</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle class="dark:text-neutral-50"
								>Ishonchingiz komilmi?</AlertDialogTitle
							>
							<AlertDialogDescription>
								Tanlagan narsalaringizning hammasi o'chiriladi va qayta tiklanmaydi!
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel>Yo'q</AlertDialogCancel>
							<AlertDialogAction @click="deleteAll">Ha</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
				<Button
					@click="itemsStore.selectAllItems"
					size="icon"
					v-show="displayActionButton"
					variant="outline"
					><CheckCheck class="w-4 h-4" />
				</Button>
				<Button
					@click="itemsStore.clearSelectedItems"
					size="icon"
					v-show="displayActionButton"
					variant="outline"
					><RotateCcw class="w-4 h-4" />
				</Button>
				<Button v-show="!showCreateCategory" class="font-semibold" @click="toogleCreateCategory"
					><CirclePlus class="w-4 h-4 mr-2" /> Yangi kategoriya</Button
				>
				<Button v-show="showCreateCategory" class="font-semibold" @click="toogleCreateCategory"
					><CircleMinus class="w-4 h-4 mr-2" /> Bekor qilish</Button
				>
			</div>
		</div>
		<CreateNewCategory v-show="showCreateCategory" />
		<section class="foods-on-menu w-full">
			<div class="pb-8 sm:mt-6 mt-2 w-full" v-for="(item, category) in items">
				<ItemCategory :category="category as string" :items="item" />
			</div>
		</section>
	</div>
</template>
