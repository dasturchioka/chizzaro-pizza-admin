<script lang="ts" setup>
import { useItems } from '@/stores/category-items'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { Button } from '@/components/ui/button'
import { ChevronLeft, Trash } from 'lucide-vue-next'
import { config } from '@/config'

const route = useRoute()
const itemsStore = useItems()

onMounted(async () => {
	await itemsStore.getSingleItem(route.params.id as string)
})

const { itemForShowPage } = storeToRefs(itemsStore)
</script>

<template>
	<div class="item-show-page">
		<Button @click="$router.go(-1)" class="dark:text-neutral-50 mb-4" variant="ghost"
			><ChevronLeft class="w-4 h-4 mr-2" /> Orqaga</Button
		>
		<div
			class="top bg-neutral-200 text-neutral-900 dark:text-white dark:bg-neutral-800 p-4 rounded-lg"
		>
			<div class="titles mt-4 flex items-center space-x-4">
				<div class="left sm:w-36 w-32">
					<img
						class="w-full h-full"
						:src="`${config.SERVER_BASE_URL}/${itemForShowPage.img}`"
						alt=""
					/>
				</div>
				<div class="right">
					<h2 class="sm:text-3xl text-xl font-bold font-raleway">
						{{ itemForShowPage.name }}
						<i class="text-base font-normal">{{ itemForShowPage.size }}</i>
					</h2>
					<p class="font-manrope font-semibold">{{ itemForShowPage.description }}</p>
					<p class="text-sm mt-4">
						<b>{{ itemForShowPage.price }}</b> so'm, <b>{{ itemForShowPage.sold }}</b> ta sotilgan
					</p>
				</div>
			</div>
		</div>
		<div class="buttons mt-4">
			<Button variant="destructive"><Trash class="w-4 h-4 mr-2" /> O'chirish</Button>
		</div>
	</div>
</template>
