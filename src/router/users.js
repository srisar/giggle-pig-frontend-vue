export const usersRoutes = [
	{
		path: '/user/:userName',
		name: 'manageUser',
		components: {
			default: () => import('../views/users/ManageUser.vue'),
			TopNavBar: () => import('../components/TopNavBar.vue'),
		},
		meta: {
			requiresAuth: true,
			haveAccess: ['ADMIN', 'MANAGER', 'USER']
		},
		
	}
];