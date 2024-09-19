<script lang="ts" setup>
import { computed, onMounted, ref, toRefs } from 'vue'
import Button from '../ui/button/Button.vue'
import Input from '../ui/input/Input.vue'
import Label from '../ui/label/Label.vue'
import { Check, CheckCheck, CirclePlus } from 'lucide-vue-next'
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
import SelectLabel from '../ui/select/SelectLabel.vue'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import Textarea from '../ui/textarea/Textarea.vue'

const props = defineProps<{ category: string }>()

const { category } = toRefs(props)

const itemsStore = useItems()

const { itemTypes } = storeToRefs(itemsStore)

const form = new FormData()
const itemDetails = ref({ name: '', description: '', size: '', price: '', category: '' })

const buttonDisabled = computed(() => {
	if (
		itemDetails.value.name &&
		itemDetails.value.description &&
		itemDetails.value.size &&
		itemDetails.value.price &&
		itemDetails.value.category
	) {
		return true
	}
	return false
})

const createNewItem = async () => {
	try {
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

		form.append('name', itemDetails.value.name)
		form.append('size', itemDetails.value.size)
		form.append('price', itemDetails.value.price)
		form.append('description', itemDetails.value.description)
		form.append('category', itemDetails.value.category)
	} catch (error: any) {
		toast(error.message || error.response.data.msg)
	} finally {
		itemDetails.value = {
			name: '',
			description: '',
			size: '',
			price: '',
			category: '',
		}
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
			<div class="flex flex-col sm:space-y-10 space-y-4">
				<div class="text-neutral-900 dark:text-neutral-50">
					<Label for="file" class="text-right"> Rasm </Label>
					<Input id="file" type="file" accept="image/png, image/jpeg, image/jpg" />
				</div>
				<div class="text-neutral-900 dark:text-neutral-50">
					<Label for="name" class="text-right"> Nomi </Label>
					<Input id="name" placeholder="Pepperoni, Chizburger, Pepsi, Tomatniy Sous" />
				</div>
				<div class="text-neutral-900 dark:text-neutral-50">
					<Label for="size" class="text-right">
						O'lcham <span class="opacity-60 ml-2">birligi bilan yozing</span></Label
					>
					<Input id="size" placeholder="36cm, 0.75L, 2kg, 1p" />
				</div>
				<div class="text-neutral-900 dark:text-neutral-50">
					<Label for="price" class="text-right">
						Narx <span class="opacity-60 ml-2">"so'm" siz yozing</span></Label
					>
					<Input id="price" placeholder="36,000, 55,000, 25,5000" />
				</div>
				<div class="text-neutral-900 dark:text-neutral-50">
					<Label for="description" class="text-right"> Ta'rif </Label>
					<Textarea
						id="description"
						placeholder="Nimadirlarni yozing"
						class="h-[120px] max-h-[120px] max-w-full"
					/>
				</div>
			</div>
			<DialogFooter>
				<Button class="sm:w-auto w-full" type="submit"> <CheckCheck class="w-4 h-4 mr-2"/> Saqlash </Button>
			</DialogFooter>
		</DialogContent>
	</Dialog>
</template>
