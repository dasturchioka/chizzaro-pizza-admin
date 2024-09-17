<script lang="ts" setup>
import { Header } from '@/components/ui/header'
import { Button } from '@/components/ui/button'
</script>

<template>
	<div class="not-found-page flex flex-col items-center h-screen justify-center">
		<div class="text flex items-center justify-center">
			<Header class="border-r pr-4">404</Header>
			<p class="pl-4 dark:text-neutral-50 text-neutral-900">Ma'lumot topilmadi</p>
		</div>
		<Button @click="$router.go(-1)" class=" my-4">Orqaga</Button>
	</div>
</template>
