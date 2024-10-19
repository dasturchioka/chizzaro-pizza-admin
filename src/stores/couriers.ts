import { couriersInstance } from '@/http'
import { Courier } from '@/models'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { toast } from 'vue-sonner'

export const useCouriers = defineStore('couriers-store', () => {
	const couriers = ref<Courier[]>([])

	async function createNewCourier(payload: {
		fullname: string
		login: string
		password: string
		phone: string
	}) {
		try {
			const response = await couriersInstance.post('/create', { ...payload })

			if (!response) {
				toast("Yuklashda xatolik bo'ldi")
				return
			}

			const data = await response.data

			if (data.status === 'bad') {
				toast(data.msg)
				return
			}

			couriers.value?.push(data.courier)
			toast(data.msg)
			return
		} catch (error: any) {
			toast(
				error.message ||
					error.response.data.msg ||
					'Xatolik yuzaga keldi, boshqatdan ishga tushiring'
			)
		}
	}

	async function getAllCouriers() {
		try {
			const response = await couriersInstance.get('/get-all')

			if (!response) {
				toast("Yuklashda xatolik bo'ldi")
				return
			}

			const data = await response.data

			if (data.status === 'bad') {
				return
			}

			couriers.value = data.couriers
			return
		} catch (error: any) {
			toast(
				error.message ||
					error.response.data.msg ||
					'Xatolik yuzaga keldi, boshqatdan ishga tushiring'
			)
		}
	}

	return { getAllCouriers, couriers, createNewCourier }
})
