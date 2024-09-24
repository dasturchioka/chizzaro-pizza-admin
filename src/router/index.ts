import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
	{
		name: 'default-layout',
		path: '/',
		component: () => import('@/layouts/default-layout.vue'),
		children: [
			{
				name: 'default-dashboard',
				path: '',
				component: () => import('@/pages/dashboard-page.vue'),
			},
			{
				name: 'default-menu',
				path: 'menu',
				component: () => import('@/pages/menu-page.vue'),
			},
			{
				name: 'default-item-show',
				path: 'item/:id',
				component: () => import('@/pages/item-show-page.vue'),
			},
		],
	},
	{
		name: 'not-found',
		path: '/:pathMatch(.*)*',
		component: () => import('@/layouts/default-layout.vue'),
		children: [
			{
				path: '',
				name: 'not-found-page',
				component: () => import('@/pages/not-found-page.vue'),
			},
		],
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router
