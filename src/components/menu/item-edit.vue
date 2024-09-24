<script setup lang="ts">
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
import AppInput from '../ui/input/Input.vue'
import { Textarea } from '../ui/textarea'
import Label from '../ui/label/Label.vue'
import Button from '../ui/button/Button.vue'
import { Check, Pencil } from 'lucide-vue-next'
import { Item } from '@/stores/category-items'
import { onMounted, ref, toRefs, watch } from 'vue'
import Select from '../ui/select/Select.vue'
import SelectTrigger from '../ui/select/SelectTrigger.vue'
import SelectValue from '../ui/select/SelectValue.vue'
import SelectContent from '../ui/select/SelectContent.vue'
import SelectGroup from '../ui/select/SelectGroup.vue'
import SelectItem from '../ui/select/SelectItem.vue'
import { storeToRefs } from 'pinia'
import { useItems } from '@/stores/category-items'

const fileInput = ref<HTMLInputElement>()

const props = defineProps<{ item: Item }>()
const itemsStore = useItems()

const { item } = toRefs(props)
const { itemTypes } = storeToRefs(itemsStore)

const itemDetails = ref({ ...item.value, category: { name: item.value.category.name } })

const handleImage = () => {
	if (fileInput.value) {
		const files = fileInput.value?.files
		if (itemDetails.value) if (files) itemDetails.value.img = files[0] as any
	}
}

async function editItem() {
	try {
		const formData = new FormData()
		formData.append('name', itemDetails.value.name)
		formData.append('description', itemDetails.value.description)
		formData.append('price', itemDetails.value.price)
		formData.append('size', itemDetails.value.size)
		formData.append('category', itemDetails.value.category.name)
		formData.append('img', itemDetails.value.img)
		formData.append('id', itemDetails.value.id)

		await itemsStore.updateItem(formData, item.value.id)
	} catch (error) {
		console.log(error)
	} finally {
		formData.delete('name')
		formData.delete('size')
		formData.delete('price')
		formData.delete('description')
		formData.delete('category')
		formData.delete('img')
	}
}

onMounted(async () => {
	await itemsStore.getCategoryTypes()
})
</script>

<template>
	<Dialog>
		<DialogTrigger as-child>
			<slot v-if="$slots.editButton" name="editButton"></slot>
			<Button v-else size="icon" variant="ghost" class="absolute right-2 top-1">
				<Pencil class="w-4 h-4" />
			</Button>
		</DialogTrigger>
		<DialogContent class="sm:max-w-[425px] dark:text-neutral-50">
			<DialogHeader>
				<DialogTitle>Mahsulotni yangilash</DialogTitle>
				<DialogDescription>
					Yangilab bo'lganingizdan keyin saqlash tugmasini bosing.
				</DialogDescription>
			</DialogHeader>
			<form @submit.prevent="editItem" class="flex flex-col sm:space-y-10 space-y-4">
				<div class="text-neutral-900 dark:text-neutral-50">
					<Select v-model:model-value="itemDetails.category.name" class="font-bold">
						<SelectTrigger id="category" class="max-w-[180px]">
							<SelectValue class="font-semibold font-raleway" placeholder="Kategoriyani tanlang" />
						</SelectTrigger>
						<SelectContent class="font-manrope">
							<SelectGroup>
								<div v-for="(t, index) in itemTypes" :key="index">
									<SelectItem v-show="t.isOnTheBase" :value="t.name">
										{{ t.name }}
									</SelectItem>
								</div>
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
				<div class="text-neutral-900 dark:text-neutral-50">
					<Label for="file" class="text-right"> Rasm </Label>
					<input
						class="flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300"
						id="file"
						type="file"
						ref="fileInput"
						accept="image/png, image/jpeg, image/jpg"
						@change="handleImage"
					/>
				</div>
				<div class="text-neutral-900 dark:text-neutral-50">
					<Label for="name" class="text-right"> Nomi </Label>
					<AppInput
						required
						id="name"
						v-model:model-value="itemDetails.name"
						placeholder="Pepperoni, Chizburger, Pepsi, Tomatniy Sous"
					/>
				</div>
				<div class="text-neutral-900 dark:text-neutral-50">
					<Label for="size" class="text-right">
						O'lcham <span class="opacity-60 ml-2">birligi bilan yozing</span></Label
					>
					<AppInput
						required
						v-model:model-value="itemDetails.size"
						id="size"
						placeholder="36cm, 0.75L, 2kg, 1p"
					/>
				</div>
				<div class="text-neutral-900 dark:text-neutral-50">
					<Label for="price" class="text-right">
						Narx <span class="opacity-60 ml-2">"so'm" siz yozing</span></Label
					>
					<AppInput
						required
						id="price"
						v-model:model-value="itemDetails.price"
						placeholder="36,000, 55,000, 25,5000"
					/>
				</div>
				<div class="text-neutral-900 dark:text-neutral-50">
					<Label for="description" class="text-right"> Ta'rif </Label>
					<Textarea
						required
						v-model:model-value="itemDetails.description"
						id="description"
						placeholder="Nimadirlarni yozing"
						class="h-[120px] max-h-[120px] max-w-full"
					/>
				</div>
				<DialogFooter>
					<Button type="submit"><Check class="w-4 h-4 mr-2" /> Saqlash </Button>
				</DialogFooter>
			</form>
		</DialogContent>
	</Dialog>
</template>
