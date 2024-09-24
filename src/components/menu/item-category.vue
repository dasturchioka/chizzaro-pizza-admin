<script lang="ts" setup>
import Header from '../ui/header/Header.vue'
import { type Item as ItemType } from '@/stores/category-items'
import { computed, defineAsyncComponent, toRefs } from 'vue'
import Button from '../ui/button/Button.vue'
import { Trash } from 'lucide-vue-next'
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
import { useItems } from '@/stores/category-items'
const Item = defineAsyncComponent(() => import('./item.vue'))
const CreateNewItem = defineAsyncComponent(() => import('./create-new-item.vue'))

const props = defineProps<{ category: string; items: ItemType[], categoryId: string }>()

const itemsStore = useItems()

const { items, category, categoryId } = toRefs(props)

const renderItemsLength = computed(() => {
	if (items.value.length === 0) {
		return `Bu kategoriyada hech narsa yo'q`
	}

	return `Jami <b>${items.value.length}</b>`
})

async function deleteCategory() {
	await itemsStore.removeCategory(categoryId.value)
}
</script>

<template>
	<div class="py-4">
		<div class="titles flex items-center justify-start mb-4 space-x-4">
			<Header class="text-lg font-semibold font-raleway">
				{{ category }}
			</Header>
			<AlertDialog>
				<AlertDialogTrigger as-child>
					<Button size="icon" variant="destructive"><Trash class="w-4 h-4" /> </Button>
				</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle class="dark:text-neutral-50">Ishonchingiz komilmi?</AlertDialogTitle>
						<AlertDialogDescription>
							Siz <b>{{ category }}</b> kategoriyasini va undagi barcha mahsulotlarni o'chirib yubormoqchisiz
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Yo'q</AlertDialogCancel>
						<AlertDialogAction @click="deleteCategory">Ha</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
		<div class="scroll-container w-full overflow-x-auto pb-4">
			<div class="flex space-x-4 max-w-full">
				<div v-for="item in items">
					<Item :item="item" />
				</div>
			</div>
		</div>
		<div class="bottom flex items-center justify-between flex-wrap gap-8 mt-4">
			<span
				v-html="renderItemsLength"
				class="opacity-50 text-neutral-900 dark:text-neutral-50"
			></span>
			<CreateNewItem :category="category" />
		</div>
	</div>
</template>
