<script setup lang="ts">
import { Logs } from 'lucide-vue-next'
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { ref } from 'vue'

const content = ref('$250.00 Lorem ipsum dolor sit amet, consectetur adipiscing elit.')

// State to toggle between truncated and full content
const showMore = ref(false)

// Function to toggle the "More/Less" state
const toggleContent = () => {
	showMore.value = !showMore.value
}

/**
 *   CREATED
  COOKING
  ONTHEWAY
  ARRIVED
  COMPLETED
  CANCELLED_BY_CLIENT
  CANCELLED_BY_COURIER
  CANCELLED_BY_SERVER
 */
</script>

<template>
	<section class="content orders">
		<h1 class="title font-extrabold sm:text-2xl md:text-3xl text-xl flex items-center">
			<Logs class="sm:w-7 sm:h-7 h-5 w-5 mr-4" /> Buyurtmalar
		</h1>
		<div class="mt-6 max-w-full overflow-x-auto">
			<Table class="mt-6 min-w-[600px]">
				<TableCaption>A list of your recent invoices.</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead class="w-[100px]"> ID </TableHead>
						<TableHead class="w-[120px]">Status</TableHead>
						<TableHead class="w-[200px]">Telefon</TableHead>
						<TableHead class="w-[130px]"> Narx </TableHead>
						<TableHead class="w-[400px]"> Mahsulotlar </TableHead>
						<TableHead> Manzil </TableHead>
					</TableRow>
				</TableHeader>
				<TableBody class="sm:text-lg">
					<TableRow>
						<TableCell class="font-bold"> AD128128 </TableCell>
						<TableCell><Badge variant="warning">Yo'lda</Badge></TableCell>
						<TableCell>+998 97 766 76 67</TableCell>
						<TableCell> 120,000 </TableCell>
						<TableCell class="relative max-w-[150px]">
							<!-- Display truncated content -->
							<span
								v-if="!showMore"
								class="truncate max-w-[150px] overflow-hidden whitespace-nowrap inline-block"
								>{{ content }}</span
							>
							<!-- Display full content -->
							<span v-else>{{ content }}</span>

							<!-- More/Less button -->
							<button @click="toggleContent" class="ml-2 text-blue-600 hover:underline">
								{{ showMore ? 'Less' : 'More' }}
							</button>
						</TableCell>
						<TableCell
							>Umar hayyom ko'chasi,
							<a href="https://google.com" class="underline text-blue-600" target="_blank"
								>Xarita</a
							>
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</div>
	</section>
</template>
