<script setup lang="ts">
import { computed, ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { CarFront, Home, Logs, Pizza, User } from 'lucide-vue-next'
import { Switch } from '@/components/ui/switch'

const sidebarOpen = ref(false)
const isDarkMode = ref(false)
const aside = ref<HTMLElement>()

const darkModeAlreadyHere = computed(() => {
	const classExist = document.body.classList.contains('dark')

	if (!classExist) {
		isDarkMode.value = false
	} else {
		isDarkMode.value = true
	}

	return classExist
})

const openSidebar = () => {
	if (!sidebarOpen.value) sidebarOpen.value = true
}

const closeSidebar = () => {
	if (sidebarOpen.value) sidebarOpen.value = false
}

const toggleDarkMode = (e: boolean) => {
	if (e) {
		const classExist = document.body.classList.contains('dark')

		if (!classExist) {
			document.body.classList.add('dark')
		}

		return
	}

	if (!e) {
		const classExist = document.body.classList.contains('dark')

		if (classExist) {
			document.body.classList.remove('dark')
		}
		return
	}
}

onClickOutside(aside, event => closeSidebar())
</script>

<template>
	<div class="default-layout flex flex-col sm:flex-row h-screen">
		<!-- Sidebar and Button Container -->
		<div ref="aside" class="aside">
			<!-- Sidebar Toggle Button for Small Screens -->
			<button
				@click="openSidebar"
				type="button"
				class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-neutral-500 rounded-lg sm:hidden hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-200 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:ring-neutral-600"
			>
				<span class="sr-only">Open sidebar</span>
				<svg
					class="w-6 h-6"
					aria-hidden="true"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						clip-rule="evenodd"
						fill-rule="evenodd"
						d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75.75 0 01-.75-.75zM2 10a.75.75.75 0 01.75-.75h14.5a.75.75.75 0 010 1.5H2.75A.75.75.75 0 012 10z"
					></path>
				</svg>
			</button>

			<!-- Sidebar -->
			<aside
				id="default-sidebar"
				class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform sm:translate-x-0 shadow-lg sm:shadow-none"
				:class="[sidebarOpen ? 'translate-x-0' : '-translate-x-full']"
			>
				<div
					class="h-full transition-all w-full sm:translate-x-0 px-3 py-4 overflow-y-auto bg-neutral-50 dark:bg-neutral-800 font-raleway border-r"
				>
					<ul class="space-y-2 font-semibold">
						<RouterLink
							to="/"
							class="link flex items-center p-2 text-neutral-900 rounded-lg dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-700 group"
						>
							<Home
								class="flex-shrink-0 w-5 h-5 text-neutral-500 transition duration-75 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white"
							/>
							<span class="flex-1 ms-3 whitespace-nowrap">Bosh sahifa</span>
						</RouterLink>
						<RouterLink
							to="/orders"
							class="link flex items-center p-2 text-neutral-900 rounded-lg dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-700 group"
						>
							<Logs
								class="flex-shrink-0 w-5 h-5 text-neutral-500 transition duration-75 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white"
							/>
							<span class="flex-1 ms-3 whitespace-nowrap">Buyurtmalar</span>
						</RouterLink>
						<RouterLink
							to="/users"
							class="link flex items-center p-2 text-neutral-900 rounded-lg dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-700 group"
						>
							<User
								class="flex-shrink-0 w-5 h-5 text-neutral-500 transition duration-75 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white"
							/>
							<span class="flex-1 ms-3 whitespace-nowrap">Mijozlar</span>
						</RouterLink>
						<RouterLink
							to="/menu"
							class="link flex items-center p-2 text-neutral-900 rounded-lg dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-700 group"
						>
							<Pizza
								class="flex-shrink-0 w-5 h-5 text-neutral-500 transition duration-75 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white"
							/>
							<span class="flex-1 ms-3 whitespace-nowrap">Menu</span>
						</RouterLink>
						<RouterLink
							to="/couriers"
							class="link flex items-center p-2 text-neutral-900 rounded-lg dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-700 group"
						>
							<CarFront
								class="flex-shrink-0 w-5 h-5 text-neutral-500 transition duration-75 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white"
							/>
							<span class="flex-1 ms-3 whitespace-nowrap">Kuryerlar</span>
						</RouterLink>
					</ul>
				</div>
			</aside>
		</div>

		<!-- Main Content -->
		<div class="main-content flex-1 p-4 sm:ml-64 overflow-x-auto">
			<div class="dark-mode flex items-center space-x-4 sm:mb-6 mb-2">
				<Switch
					@update:checked="toggleDarkMode"
					:default-checked="darkModeAlreadyHere"
					v-model:checked="isDarkMode"
					id="check-dark-mode"
				/>
				<label for="check-dark-mode" class="text-neutral-900 dark:text-neutral-50 font-manrope"
					>Qorong'u rejim</label
				>
			</div>
			<RouterView class="py-4 font-manrope" />
		</div>
	</div>
</template>

<style scoped>
.link.router-link-active.router-link-exact-active {
	@apply bg-neutral-200 dark:bg-neutral-700;
}

.link.router-link-active.router-link-exact-active svg {
	@apply text-neutral-900 dark:text-white;
}
</style>
