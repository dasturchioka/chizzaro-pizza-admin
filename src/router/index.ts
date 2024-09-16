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
		],
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router
