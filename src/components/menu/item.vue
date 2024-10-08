<script setup lang="ts">
import { Checkbox } from '../ui/checkbox'
import { Item } from '@/stores/category-items'
import { useItems } from '@/stores/category-items'
import { storeToRefs } from 'pinia'
import { computed, defineAsyncComponent, ref, toRefs } from 'vue'
import { config } from '@/config'
const ItemEdit = defineAsyncComponent(() => import('./item-edit.vue'))

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

		<ItemEdit :item="item" />
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
