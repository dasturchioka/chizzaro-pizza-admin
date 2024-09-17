<script lang="ts" setup>
import { computed, onMounted } from 'vue'
import { Header } from '@/components/ui/header'
import { Pizza, CirclePlus, Trash, CheckCheck } from 'lucide-vue-next'
import { useItems } from '@/stores/items'
import { storeToRefs } from 'pinia'
import Item from '@/components/menu/item.vue'
import Button from '@/components/ui/button/Button.vue'

const itemsStore = useItems()

const { items, selectedItems } = storeToRefs(itemsStore)

const displayActionButton = computed(() => {
	return selectedItems.value.length > 0
})

onMounted(async () => {
	await itemsStore.getAllItems()
})
</script>

<template>
	<div class="menu-page">
		<div class="titles flex items-center justify-between">
			<Header variant="default"> <Pizza class="sm:w-7 sm:h-7 h-5 w-5 mr-4" /> Menu </Header>
			<div class="buttons flex items-center space-x-4 flex-wrap">
				<Button class="font-semibold"><CirclePlus class="w-4 h-4 mr-2" /> Yangi kategoriya</Button>
				<Button v-show="displayActionButton" variant="destructive"
					><Trash class="w-4 h-4 mr-2" /> O'chirish
				</Button>
			</div>
		</div>
		<section class="foods-on-menu pb-8 sm:mt-6 mt-2">
			<div v-for="(items, category) in items" :id="category as string" class="py-4">
				<Header class="text-lg mb-4 font-semibold font-raleway uppercase">
					{{ category }}
				</Header>
				<div class="scroll-container">
					<div class="flex space-x-4 max-w-full">
						<div v-for="item in items">
							<Item :item="item" />
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<style scoped>
.scroll-container::-webkit-scrollbar {
	display: none;
}

/* Hide the scrollbar in Firefox */
.scroll-container {
	-ms-overflow-style: none; /* IE and Edge */
	scrollbar-width: none; /* Firefox */
}

/* Custom style for scroll container */
.scroll-container {
	overflow-x: auto;
	padding-bottom: 1rem;
}

.scroll-container-no-pd {
	-ms-overflow-style: none; /* IE and Edge */
	scrollbar-width: none; /* Firefox */
	overflow-x: auto;
}
</style>
