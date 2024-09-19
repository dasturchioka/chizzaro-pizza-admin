import { defineStore } from 'pinia'
import { categoryInstance, itemsInstance } from '@/http'
import { ref } from 'vue'
import { toast } from 'vue-sonner'

export interface CategoryOfItems {
	id: string
	name: string
	items: Item[]
	[key: string]: any
}

export interface Item {
	id: string
	name: string
	size: string
	price: string
	quantity: number
	img: string
	category: string
}

export const useItems = defineStore('items-store', () => {
	const id = ref('items-store')
	const items = ref<CategoryOfItems[]>()
	const selectedItems = ref<Item[]>([])
	const itemTypes = ref<{ name: string; isOnTheBase: boolean }[]>([])

	async function createCategory(name: string) {
		try {
			const response = await categoryInstance.post('/create', { name })

			if (!response) {
				toast("Yuklashda xatolik bo'ldi")
				return
			}

			items.value?.unshift(response.data.category)
			itemTypes.value = response.data.categoryTypes
		} catch (error: any) {
			console.log(error)
			toast(
				error.message ||
					error.response.data.msg ||
					'Xatolik yuzaga keldi, boshqatdan ishga tushiring'
			)
		}
	}

	async function getCategoryTypes() {
		try {
			const response = await categoryInstance.get('/get-category-types')

			if (!response) {
				toast("Yuklashda xatolik bo'ldi")
				return
			}

			if (response.data.status === 'bad') {
				return
			}

			itemTypes.value = response.data.categories
		} catch (error: any) {
			console.log(error)
			toast(
				error.message ||
					error.response.data.msg ||
					'Xatolik yuzaga keldi, boshqatdan ishga tushiring'
			)
		}
	}

	async function createItem(data: FormData) {
		try {
			const response = await itemsInstance.post('/create')
		} catch (error) {
			
		}
	}

	async function getAllItems() {
		try {
			const response = await itemsInstance.get('/get-all')

			if (!response) {
				toast("Yuklashda xatolik bo'ldi")
				return
			}

			items.value = response.data.items
		} catch (error: any) {
			console.log(error)
			toast(
				error.message ||
					error.response.data.msg ||
					'Xatolik yuzaga keldi, boshqatdan ishga tushiring'
			)
		}
	}

	async function selectItem(item: Item) {
		try {
			const findItem = selectedItems.value.find(i => i.id === item.id)

			if (findItem) {
				selectedItems.value = selectedItems.value.filter(i => i.id !== item.id)
			}

			selectedItems.value.push(item)
			console.log(selectedItems.value)
		} catch (error: any) {
			console.log(error)
			toast(error.message || 'Xatolik yuzaga keldi')
		}
	}

	async function deselectItem(item: Item) {
		try {
			const findItem = selectedItems.value.find(i => i.id === item.id)

			if (findItem) {
				selectedItems.value = selectedItems.value.filter(i => i.id !== item.id)
			}
		} catch (error: any) {
			console.log(error)
			toast(error.message || 'Xatolik yuzaga keldi')
		}
	}

	async function clearSelectedItems() {
		selectedItems.value.length = 0
	}

	async function selectAllItems() {
		if (!items.value) return

		const allItems = items.value.flatMap(category => category.items)

		allItems.forEach(item => {
			// Check if the item is already in selectedItems (based on the `name` property)
			const isItemSelected = selectedItems.value.some(selected => selected.id === item.id)

			// If not found, push it into selectedItems
			if (!isItemSelected) {
				selectedItems.value.push(item)
			}
		})
	}

	return {
		getAllItems,
		items,
		selectedItems,
		selectItem,
		deselectItem,
		clearSelectedItems,
		selectAllItems,
		createCategory,
		getCategoryTypes,
		itemTypes,
		id,
	}
})
