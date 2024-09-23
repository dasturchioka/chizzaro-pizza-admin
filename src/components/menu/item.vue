<script setup lang="ts">
import { Checkbox } from '../ui/checkbox'
import { Item } from '@/stores/category-items'
import { useItems } from '@/stores/category-items'
import { storeToRefs } from 'pinia'
import { computed, ref, toRefs } from 'vue'
import Button from '../ui/button/Button.vue'
import { Pencil } from 'lucide-vue-next'
import { config } from '@/config'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogClose,
} from '@/components/ui/dialog'
import Input from '../ui/input/Input.vue'
import Label from '../ui/label/Label.vue'

const props = defineProps<{ item: Item }>()

const itemsStore = useItems()

const itemSelected = ref(false)

const { selectedItems } = storeToRefs(itemsStore)
const { item } = toRefs(props)

const selectItem = async (checked: boolean) => {
	if (checked) {
		await itemsStore.selectItem(props.item)
		return
	} else {
		await itemsStore.deselectItem(props.item)
		return
	}
}

const isItemSelected = computed((): boolean | 'indeterminate' | undefined => {
	const isItemAvailable = selectedItems.value.find(i => i.id === props.item.id)

	if (isItemAvailable) {
		itemSelected.value = true
		return true
	}

	itemSelected.value = false
	return false
})
</script>

<template>
	<div
		class="w-[220px] transition-all h-auto bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-50 p-4 rounded-xl border-2 flex flex-col items-center shadow-lg flex-shrink-0 relative"
		:class="[
			isItemSelected ? 'border-neutral-900 dark:border-neutral-50' : ' dark:border-neutral-600',
		]"
	>
		<Checkbox
			v-model:checked="itemSelected"
			class="absolute left-4 top-4"
			@update:checked="selectItem"
		/>
		<Dialog>
			<DialogTrigger as-child>
				<Button size="icon" variant="ghost" class="absolute right-2 top-1"
					><Pencil class="w-4 h-4"
				/></Button>
			</DialogTrigger>
			<DialogContent class="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Mahsulotni yangilash</DialogTitle>
					<DialogDescription>
						Yangilab bo'lganingizdan keyin saqlash tugmasini bosing.
					</DialogDescription>
				</DialogHeader>
				<div class="flex flex-col items-start py-4 space-y-4">
					<div class="w-full flex flex-col items-start space-y-2">
						<Label for="name" class="text-right"> Nomi </Label>
						<Input id="name" v-model:model-value="item.name" />
					</div>
					<div class="w-full flex flex-col items-start space-y-2">
						<Label for="price" class="text-right"> Narxi </Label>
						<Input id="price" v-model:model-value="item.price"  />
					</div>
				</div>
				<DialogFooter>
					<Button type="submit"> Save changes </Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>

		<div class="img overflow-hidden w-auto h-32">
			<img
				:src="config.SERVER_BASE_URL + '/' + item.img"
				:alt="`${item.name} chizzaro pizza gurlan xorazm urganch`"
				class="w-full h-full mb-2 object-cover"
			/>
		</div>
		<div class="text text-left self-start my-2">
			<h3 class="text-xl font-extrabold">{{ item.name }}</h3>
			<p class="text-3xl font-bold">{{ item.price }}</p>
		</div>
		<div class="buttons w-full flex">
			<RouterLink
				class="font-bold text-center py-2 rounded-md bg-neutral-900 text-neutral-50 dark:bg-neutral-50 dark:text-neutral-900 w-full"
				:to="`/item/${item.id}`"
				>Ko'rish</RouterLink
			>
		</div>
	</div>
</template>
