<script lang="ts" setup>
import { computed, onMounted, ref, toRefs } from 'vue'
import Button from '../ui/button/Button.vue'
import { Input as AppInput } from '../ui/input'
import Label from '../ui/label/Label.vue'
import { CheckCheck, CirclePlus } from 'lucide-vue-next'
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
import Textarea from '../ui/textarea/Textarea.vue'

const props = defineProps<{ category: string }>()

const { category } = toRefs(props)

const itemsStore = useItems()

const { itemTypes } = storeToRefs(itemsStore)
const fileInput = ref<HTMLInputElement>()

const form = new FormData()
const itemDetails = ref<{
	name: string
	description: string
	size: string
	price: string
	category: any
	img?: File
}>({
	name: '',
	description: '',
	size: '',
	price: '',
	category: category.value ?? '',
	img: undefined,
})

const buttonDisabled = computed(() => {
	if (!itemDetails.value) return true
	if (
		itemDetails.value.name &&
		itemDetails.value.description &&
		itemDetails.value.size &&
		itemDetails.value.price &&
		itemDetails.value.category &&
		itemDetails.value.img
	) {
		return false
	}
	return true
})

const createNewItem = async () => {
	try {
		if (!itemDetails.value) return

		if (!itemDetails.value.name) {
			toast('Nom kiritilishi kerak')
			return
		}
		if (!itemDetails.value.size) {
			toast("O'lcham kiritilishi kerak")
			return
		}
		if (!itemDetails.value.price) {
			toast('Narx kiritilishi kerak')
			return
		}
		if (!itemDetails.value.description) {
			toast("Ta'rif kiritilishi kerak")
			return
		}
		if (!itemDetails.value.category) {
			toast('Kategoriya kiritilishi kerak')
			return
		}
		if (!itemDetails.value.img) {
			toast('Rasm kiritilishi kerak')
			return
		}

		form.append('name', itemDetails.value.name)
		form.append('size', itemDetails.value.size)
		form.append('price', itemDetails.value.price)
		form.append('description', itemDetails.value.description)
		form.append('category', itemDetails.value.category)
		form.append('img', itemDetails.value.img)

		await itemsStore.createItem(form)
	} catch (error: any) {
		toast(error.message || error.response.data.msg)
	} finally {
		itemDetails.value = {
			name: '',
			description: '',
			size: '',
			price: '',
			category: '',
			img: undefined,
		}
	}
}

const handleImage = () => {
	if (fileInput.value) {
		const files = fileInput.value?.files
		if (itemDetails.value) if (files) itemDetails.value.img = files[0]
	}
}

onMounted(async () => {
	await itemsStore.getCategoryTypes()
})
</script>

<template>
	<Dialog>
		<DialogTrigger as-child>
			<Button> <CirclePlus class="w-4 h-4 mr-2" /> Yangi {{ category }} </Button>
		</DialogTrigger>
		<DialogContent @interact-outside="e => e.preventDefault()" class="sm:max-w-[90%] h-[90vh]">
			<DialogHeader>
				<DialogTitle class="text-neutral-900 dark:text-neutral-50"
					>Yangi {{ category }} qo'shish</DialogTitle
				>
				<DialogDescription class="text-neutral-900 dark:text-neutral-50">
					Hamma ma'lumotlarni kiriting!
				</DialogDescription>
			</DialogHeader>
			<form @submit.prevent="createNewItem" class="flex flex-col sm:space-y-10 space-y-4">
				<div class="text-neutral-900 dark:text-neutral-50">
					<Select v-model:model-value="itemDetails.category" class="font-bold">
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
						id="price"
						v-model:model-value="itemDetails.price"
						placeholder="36,000, 55,000, 25,5000"
					/>
				</div>
				<div class="text-neutral-900 dark:text-neutral-50">
					<Label for="description" class="text-right"> Ta'rif </Label>
					<Textarea
						v-model:model-value="itemDetails.description"
						id="description"
						placeholder="Nimadirlarni yozing"
						class="h-[120px] max-h-[120px] max-w-full"
					/>
				</div>
			</form>
			<DialogFooter>
				<DialogClose as-child>
					<Button
						@click="createNewItem"
						:disabled="buttonDisabled"
						class="sm:w-auto w-full"
						type="submit"
					>
						<CheckCheck class="w-4 h-4 mr-2" /> Saqlash
					</Button>
				</DialogClose>
			</DialogFooter>
		</DialogContent>
	</Dialog>
</template>
