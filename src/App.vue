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

<style>
::-webkit-scrollbar {
	width: 3px;
	height: 6px;
}

::-webkit-scrollbar-button {
	width: 0px;
	height: 0px;
}

::-webkit-scrollbar-thumb {
	@apply bg-neutral-900 dark:bg-neutral-50 rounded-3xl;
}

::-webkit-scrollbar-thumb:active {
	@apply dark:bg-neutral-100 bg-neutral-600;
}

::-webkit-scrollbar-track {
	@apply bg-transparent
}

::-webkit-scrollbar-corner {
	background: transparent;
}
</style>
