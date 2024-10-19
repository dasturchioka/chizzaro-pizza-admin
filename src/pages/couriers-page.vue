<script lang="ts" setup>
import Header from '@/components/ui/header/Header.vue'
import { CarTaxiFront, LoaderCircle, Plus, PlusCircle, Trash } from 'lucide-vue-next'
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import Button from '@/components/ui/button/Button.vue'
import { useCouriers } from '@/stores/couriers'
import { useLoading } from '@/stores/loading'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import CreateNewCourier from '@/components/couriers/create-new-courier.vue'
import { Courier } from '@/models'

const loadingStore = useLoading()
const courierStore = useCouriers()

const { loading } = storeToRefs(loadingStore)
const { couriers } = storeToRefs(courierStore)

onMounted(async () => {
	await courierStore.getAllCouriers()
})
</script>

<template>
	<div class="couriers-page">
		<Header class="flex items-center"><CarTaxiFront class="size-6 mr-2" />Kuryerlar </Header>
		<div
			v-if="loading"
			class="loading flex items-center font-bold my-4 text-neutral-900 dark:text-neutral-50 transition-all"
		>
			<LoaderCircle class="size-6 mr-2 animate-spin" /> Yuklanmoqda...
		</div>
		<Table
			v-else-if="couriers && couriers.length && !loading"
			class="mt-6 min-w-[600px] text-neutral-900 dark:text-neutral-50"
		>
			<TableCaption class="space-y-4 mt-0">
				<CreateNewCourier>
					<template #trigger>
						<Button
							variant="ghost"
							class="px-1 font-semibold w-full flex items-center justify-start py-6"
							><Plus class="size-4 mr-2" /> Yangi kuryer qo'shish</Button
						>
					</template>
				</CreateNewCourier>
				<p>
					Jami kuryerlar: <b>{{ couriers.length }}</b>
				</p>
			</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead class="w-[20px] font-bold"> № </TableHead>
					<TableHead class="w-[280px] font-bold">Ism familiya</TableHead>
					<TableHead class="w-[280px] font-bold">Login</TableHead>
					<TableHead class="w-[200px] font-bold">Parol</TableHead>
					<TableHead class="w-[130px] font-bold"> Telefon </TableHead>
					<TableHead class="w-[160px] font-bold"> Buyurtmalar soni </TableHead>
					<TableHead class="w-[220px] font-bold"> Ro'yxatdan o'tgan sana </TableHead>
					<TableHead class="font-bold"> Amallar </TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				<TableRow v-for="(courier, index) in couriers" :key="index">
					<TableCell>{{ index + 1 }}</TableCell>
					<TableCell>{{ courier.fullname }}</TableCell>
					<TableCell class="font-bold">{{ courier.login }}</TableCell>
					<TableCell class="font-bold">{{ courier.password }}</TableCell>
					<TableCell>{{ courier.phone }}</TableCell>
					<TableCell class="font-bold">{{ courier.ordersLength }}</TableCell>
					<TableCell>{{
						new Date(courier.createdAt).toLocaleString('en-GB', {
							day: '2-digit',
							month: '2-digit',
							year: 'numeric',
							hour: '2-digit',
							minute: '2-digit',
						})
					}}</TableCell>
					<TableCell>
						<Button variant="destructive">
							<Trash class="size-4" />
						</Button>
					</TableCell>
				</TableRow>
			</TableBody>
		</Table>
		<div
			v-else
			class="my-10 flex flex-col space-y-2 items-start"
		>
			<h1 class="font-bold sm:text-xl text-lg">Kuryerlar topilmadi</h1>
			<CreateNewCourier>
				<template #trigger>
					<Button class="font-semibold"
						><PlusCircle class="size-4 mr-2" /> Yangi kuryer qo'shish</Button
					>
				</template>
			</CreateNewCourier>
		</div>
	</div>
</template>
