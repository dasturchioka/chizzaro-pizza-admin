<script setup lang="ts">
import { RouterView } from 'vue-router'
import { Toaster } from 'vue-sonner'
</script>

<template>
	<div class="app dark:bg-neutral-900 bg-neutral-50 overflow-y-auto">
		<Toaster
			position="top-center"
			:toastOptions="{
				style: { background: '#fff' },
				class: 'my-toast',
				descriptionClass: 'my-toast-description',
			}"
		/>
		<RouterView />
	</div>
</template>

<style scoped></style>
