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
}

interface Items {
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

	return { getAllItems, items, selectedItems, selectItem, deselectItem, id }
})
