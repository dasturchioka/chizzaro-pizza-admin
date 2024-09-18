<script lang="ts" setup>
import { computed, ref } from 'vue'
import Button from '../ui/button/Button.vue'
import Input from '../ui/input/Input.vue'
import Label from '../ui/label/Label.vue'
import { Check } from 'lucide-vue-next'

const name = ref('')

const buttonDisabled = computed(() => {
	return name.value.length === 0
})

async function createNewCategory() {}
</script>

<template>
	<div
		class="create-new-category w-full bg-neutral-100 text-neutral-900 dark:text-neutral-50 dark:bg-neutral-800 border rounded-lg p-4 sm:mt-6 mt-4"
	>
		<h1 class="text-lg font-bold font-raleway">Yangi kategoriya yaratish</h1>
		<form @submit.prevent="createNewCategory" class="space-y-4">
			<div class="form-group mt-4">
				<Label for="name">Nomi</Label>
				<Input v-model:model-value="name" id="name" placeholder="Masalan: Burger, Lavash" />
			</div>
			<Button :disabled="buttonDisabled" class="transition-all flex items-center"><Check class="w-4 h-4 mr-2" /> Saqlash</Button>
		</form>
	</div>
</template>
