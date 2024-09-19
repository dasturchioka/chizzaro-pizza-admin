<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import Button from '../ui/button/Button.vue'
import { Check } from 'lucide-vue-next'
import { useItems } from '@/stores/category-items'
import { toast } from 'vue-sonner'
import { storeToRefs } from 'pinia'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'

const itemsStore = useItems()

const { itemTypes } = storeToRefs(itemsStore)

const name = ref('')

const buttonDisabled = computed(() => {
	return name.value.length === 0
})

const createNewCategory = async () => {
	try {
		await itemsStore.createCategory(name.value)
	} catch (error: any) {
		toast(error.message || error.response.data.msg)
	} finally {
		name.value = ''
	}
}

onMounted(async () => {
	await itemsStore.getCategoryTypes()
})
</script>

<template>
	<div
		class="create-new-category w-full bg-neutral-100 text-neutral-900 dark:text-neutral-50 dark:bg-neutral-800 border rounded-lg p-4 sm:mt-6 mt-4"
	>
		<h1 class="text-lg font-bold font-raleway">Yangi kategoriya yaratish</h1>
		<form @submit.prevent="createNewCategory" class="space-y-4">
			<div class="form-group mt-4">
				<Select v-model:model-value="name" class="font-bold">
					<SelectTrigger class="max-w-[180px]">
						<SelectValue class="font-semibold font-raleway" placeholder="Turni tanlang" />
					</SelectTrigger>
					<SelectContent class="font-manrope">
						<SelectGroup>
							<div v-for="(t, index) in itemTypes" :key="index">
								<SelectItem v-show="!t.isOnTheBase" :value="t.name">
									{{ t.name }}
								</SelectItem>
							</div>
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>
			<Button type="submit" :disabled="buttonDisabled" class="transition-all flex items-center"
				><Check class="w-4 h-4 mr-2" /> Saqlash</Button
			>
		</form>
	</div>
</template>
