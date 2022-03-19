export const pagesRoutes = [
	{
		path: '/about',
		name: 'about',
		// route level code-splitting
		// this generates a separate chunk (About.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		components: {
			default: () => import('../views/pages/AboutView.vue'),
			TopNavBar: () => import('../components/TopNavBar.vue'),
		},
		meta: {
			requiresAuth: true,
			haveAccess: ['ADMIN', 'MANAGER', 'USER']
		}
	},
];