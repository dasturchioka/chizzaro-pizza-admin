<script lang="ts" setup>
import Header from '../ui/header/Header.vue'

import { type Item as ItemType } from '@/stores/category-items'
import { CircleMinus, CirclePlus } from 'lucide-vue-next'
import Button from '../ui/button/Button.vue'
import Item from './item.vue'
import { computed, toRefs } from 'vue'
import CreateNewItem from './create-new-item.vue'

const props = defineProps<{ category: string; items: ItemType[] }>()

const { items, category } = toRefs(props)

const renderItemsLength = computed(() => {
	if (items.value.length === 0) {
		return `Bu kategoriyada hech narsa yo'q`
	}

	return `Jami <b>${items.value.length}</b>`
})
</script>

<template>
	<div class="py-4">
		<div class="titles flex items-center justify-between">
			<Header class="text-lg mb-4 font-semibold font-raleway">
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
			<span
				v-html="renderItemsLength"
				class="opacity-50 text-neutral-900 dark:text-neutral-50"
			></span>
			<CreateNewItem :category="category" />
		</div>
	</div>
</template>
