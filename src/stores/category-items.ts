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
	category: {
		name: string
		[key: string]: any
	}
	description: string
	sold?: number
	[key: string]: any
}

export const useItems = defineStore('items-store', () => {
	const id = ref('items-store')
	const items = ref<CategoryOfItems[]>()
	const selectedItems = ref<Item[]>([])
	const itemTypes = ref<{ name: string; isOnTheBase: boolean }[]>([])
	const itemForShowPage = ref<Item>({
		id: '',
		name: '',
		size: '',
		price: '',
		quantity: 0,
		img: '',
		category: { name: '' },
		sold: 0,
		description: '',
	})

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
			if (itemTypes.value.length) return

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
			const response = await itemsInstance.post('/create', data, {
				headers: {
					'Content-Type': 'multipart/form-data', // Ensure the correct Content-Type is set
				},
			})

			if (!response) {
				toast("Internet yoki server bilan aloqa yo'q")
				return
			}

			const foundItem = items.value?.find(i => i.id === response.data.categoryId)
			if (foundItem) {
				foundItem.items.push(response.data.item)
				return
			}
		} catch (error: any) {
			console.log(error)
			toast(
				error.message ||
					error.response.data.msg ||
					'Xatolik yuzaga keldi, boshqatdan ishga tushiring'
			)
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

	async function getSingleItem(id: string) {
		try {
			const response = await itemsInstance.get('/get-item/' + id)

			if (!response) {
				toast("Yuklashda xatolik bo'ldi")
				return
			}

			if (response.data.status === 'bad') {
				toast(response.data.msg)
				return
			}

			itemForShowPage.value = response.data.item
		} catch (error: any) {
			console.log(error)
			toast(
				error.message ||
					error.response.data.msg ||
					'Xatolik yuzaga keldi, boshqatdan ishga tushiring'
			)
		}
	}

	async function updateItem(data: FormData, id: string) {
		try {
			const response = await itemsInstance.put('/update-item/' + id, data)

			if (!response) {
				toast("Yuklashda xatolik bo'ldi")
				return
			}

			if (response.data.status === 'bad') {
				toast(response.data.msg)
				return
			}

			const updatedItem = await response.data.item

			// Find the current category of the item
			const currentCategory = items.value?.find(category =>
				category.items.some(item => item.id === id)
			)

			if (currentCategory) {
				if (currentCategory?.id !== updatedItem.categoryId) {
					// Remove the item from the current category
					if (currentCategory) {
						currentCategory.items = currentCategory.items.filter(item => item.id !== updatedItem.id)
					}

					const newCategory = items.value?.find(category => category.id === updatedItem.categoryId)

					if (newCategory) {
						const findItem = newCategory.items.find(i => i.id === updatedItem.id)
						if (findItem) {
							newCategory.items = newCategory.items.filter(item => item.id !== updatedItem.id)
						}
						newCategory.items.push(updatedItem)
					}
				}
			}

			itemForShowPage.value = updatedItem

			if (!items.value) return

			const category = items.value.find(c => c.id === updatedItem.categoryId)

			if (category) {
				// Find the item by itemId within the items array
				const item = category.items.find(i => i.id === updatedItem.id)

				if (item) {
					// Update the item properties
					Object.assign(item, updatedItem)
				}
			}

			toast(response.data.msg)
		} catch (error: any) {
			console.log(error)
			toast(
				error.message ||
					error.response.data.msg ||
					'Xatolik yuzaga keldi, boshqatdan ishga tushiring'
			)
		}
	}

	async function deleteItems() {
		try {
			const response = await itemsInstance.delete('/delete-items', {
				data: {
					items: [...selectedItems.value],
				},
			})

			if (!response) {
				toast("Yuklashda xatolik bo'ldi")
				return
			}

			if (response.data.status === 'bad') {
				toast(response.data.msg)
				return
			}

			selectedItems.value.forEach(item => {
				const category = items.value?.find(category => category.id === item.categoryId)
				if (category) {
					category.items = category.items.filter(i => i.id !== item.id)
				}
			})

			selectedItems.value = []
			toast(response.data.msg)

			// Remove the item from the category's items array
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

	async function removeCategory(id: string) {
		try {
			const response = await categoryInstance.delete(`/delete-category/${id}`)

			if (!response) {
				toast("Yuklashda xatolik bo'ldi")
				return
			}

			if (response.data.status === 'bad') {
				toast(response.data.msg)
				return
			}

			items.value = items.value?.filter(i => i.id !== id)
			toast(response.data.msg)
		} catch (error: any) {
			console.log(error)
			toast(
				error.message ||
					error.response.data.msg ||
					'Xatolik yuzaga keldi, boshqatdan ishga tushiring'
			)
		}
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
		createItem,
		getSingleItem,
		itemForShowPage,
		deleteItems,
		updateItem,
		removeCategory,
		id,
	}
})
