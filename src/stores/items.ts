import { defineStore } from 'pinia'
import { itemsInstance } from '@/http'
import { ref } from 'vue'
import { toast } from 'vue-sonner'

export interface Item {
	id: string
	name: string
	size: string
	price: string
	quantity: number
	image: string
	selected: boolean
	category: string
}

export interface Items {
	[key: string]: Item[]
}

export const useItems = defineStore('items-store', () => {
	const id = ref('items-store')
	const items = ref<Items>()
	const selectedItems = ref<Item[]>([])

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

		const allItems = []

		// Extract and flatten the pizza and drink arrays, then push them into the `allItems` array
		allItems.push(...Object.values(items.value).flat())

		allItems.forEach(item => {
			// Check if the item is already in selectedItems (based on the `name` property)
			const isItemSelected = selectedItems.value.some(selected => selected.id === item.id)

			// If not found, push it into selectedItems
			if (!isItemSelected) {
				selectedItems.value.push(item)
			}
		})

		return
	}

	return {
		getAllItems,
		items,
		selectedItems,
		selectItem,
		deselectItem,
		clearSelectedItems,
		selectAllItems,
		id,
	}
})
