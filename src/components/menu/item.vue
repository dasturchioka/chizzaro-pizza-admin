<script setup lang="ts">
import { Checkbox } from '../ui/checkbox'
import { Item } from '@/stores/items'
import { useItems } from '@/stores/items'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
const props = defineProps<{ item: Item }>()

const itemsStore = useItems()

const { selectedItems } = storeToRefs(itemsStore)

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

	if (isItemAvailable) return true

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
			class="absolute left-4 top-4"
			v-model:checked="isItemSelected"
			@update:checked="selectItem"
		/>
		<img :src="item.image" alt="pizza image" class="w-32 h-32 mb-2" />
		<div class="text text-left self-start my-2">
			<h3 class="text-xl font-extrabold">{{ item.name }}</h3>
			<p class="text-3xl font-bold">{{ item.price }}</p>
		</div>
		<div class="buttons"></div>
	</div>
</template>
