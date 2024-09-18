<script lang="ts" setup>
import Header from '../ui/header/Header.vue'

import { type Item as ItemType } from '@/stores/category-items'
import { CirclePlus } from 'lucide-vue-next'
import Button from '../ui/button/Button.vue'
import Item from './item.vue'

// const selectedItemsNumber = computed(() => {
// 	return `Tanlandi: <b>${selectedItems.value.length}</b> ta element`
// })

const props = defineProps<{ category: string; items: ItemType[] }>()
</script>

<template>
	<div class="py-4">
		<div class="titles flex items-center justify-between">
			<Header class="text-lg mb-4 font-semibold font-raleway uppercase">
				{{ category }}
			</Header>
		</div>
		<div class="scroll-container w-full overflow-x-auto pb-4">
			<div class="flex space-x-4 max-w-full">
				<div v-for="item in items">
					<Item :item="item" />
				</div>
			</div>
		</div>
		<div class="bottom flex items-center justify-between flex-wrap gap-8 mt-4">
			<span class="opacity-50 text-neutral-900 dark:text-neutral-50"
				>Jami <b>{{ items.length }}</b> ta</span
			>
			<Button><CirclePlus class="mr-2 w-4 h-4" /> Yangi {{ props.category }}</Button>
		</div>
	</div>
</template>
