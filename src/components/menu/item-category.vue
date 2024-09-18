<script lang="ts" setup>
import { Items } from '@/stores/items'
import Header from '../ui/header/Header.vue'
import { computed } from 'vue'
import Item from './item.vue'

// const selectedItemsNumber = computed(() => {
// 	return `Tanlandi: <b>${selectedItems.value.length}</b> ta element`
// })

const props = defineProps<{ category: string; items: Item[] }>()
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
		<span class="opacity-50 text-neutral-900 dark:text-neutral-50"
			>Jami <b>{{ items.length }}</b> ta</span
		>
	</div>
</template>
