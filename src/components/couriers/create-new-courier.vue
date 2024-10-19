<script lang="ts" setup>
import { computed, ref } from 'vue'
import Button from '../ui/button/Button.vue'
import { Check, Eye, EyeOff } from 'lucide-vue-next'
import { useCouriers } from '@/stores/couriers'
import { toast } from 'vue-sonner'
import Label from '../ui/label/Label.vue'
import Input from '../ui/input/Input.vue'
import { vMaska } from 'maska/vue'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'

const courierStore = useCouriers()

const newCourierDetails = ref({
	fullname: '',
	login: '',
	password: '',
	phone: '998',
})

const buttonDisabled = computed(() => {
	return (
		newCourierDetails.value.fullname.length < 5 ||
		!/^[a-zA-Z ]+$/.test(newCourierDetails.value.fullname) ||
		newCourierDetails.value.login.length < 5 ||
		!/^[a-zA-Z0-9]+$/.test(newCourierDetails.value.login) ||
		newCourierDetails.value.password.length < 8 ||
		newCourierDetails.value.phone.length !== 16
	)
})

const createNewCourier = async () => {
	try {
		await courierStore.createNewCourier(newCourierDetails.value)
	} catch (error: any) {
		toast(error.message || error.response.data.msg)
	} finally {
		newCourierDetails.value = { fullname: '', login: '', password: '', phone: '998' }
	}
}

const showPassword = ref(false)

const togglePassword = () => {
	showPassword.value = !showPassword.value
}

</script>

<template>
	<Dialog>
		<DialogTrigger as-child>
			<slot name="trigger"></slot>
		</DialogTrigger>
		<DialogContent class="sm:max-w-[425px]">
			<DialogHeader>
				<DialogTitle>Yangi kuryer qo'shish</DialogTitle>
				<DialogDescription>
					Yangi kuryer uchun talab qilinadigan ma'lumotlarni kiritb saqlashni bosing
				</DialogDescription>
			</DialogHeader>
			<form @submit.prevent="createNewCourier">
				<div class="form-group mt-4 space-y-2">
					<div class="form-group">
						<Label for="fullname">Ism familiya</Label>
						<Input
							required
							type="text"
							id="fullname"
							placeholder="Faqat lotin harflarida"
							v-model:model-value="newCourierDetails.fullname"
						/>
					</div>
					<div class="form-group">
						<Label for="login">Login</Label>
						<Input
							required
							type="text"
							id="login"
							placeholder="Faqat lotin harf va raqamlarda"
							v-model:model-value="newCourierDetails.login"
						/>
					</div>
					<div class="form-group">
						<Label for="password" class="flex items-center">
							Parol
							<button type="button" @click="togglePassword" class="p-2">
								<EyeOff v-if="showPassword" class="size-4" />
								<Eye v-else class="size-4" />
							</button>
						</Label>
						<Input
							required
							:type="[showPassword ? 'text' : 'password']"
							id="password"
							placeholder="Kamida 8 ta belgi"
							v-model:model-value="newCourierDetails.password"
						/>
					</div>
					<div class="form-group">
						<Label for="phone">Telefon raqam</Label>
						<Input
							required
							type="text"
							id="phone"
							placeholder=""
							v-model:model-value="newCourierDetails.phone"
							v-maska="'998 ## ### ## ##'"
						/>
					</div>
				</div>
				<Button
					type="submit"
					:disabled="buttonDisabled"
					class="transition-all flex items-center mt-4 w-full"
				>
					<Check class="w-4 h-4 mr-2" /> Saqlash
				</Button>
			</form>
		</DialogContent>
	</Dialog>
</template>
