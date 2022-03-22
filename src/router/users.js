export const usersRoutes = [
	{
		path: '/user/me',
		name: 'manageMe',
		components: {
			default: () => import('../views/users/ManageMe.vue'),
			TopNavBar: () => import('../components/TopNavBar.vue'),
			Drawer: () => import('../views/users/UsersDrawer.vue'),
		},
		meta: {
			requiresAuth: true,
			haveAccess: ['ADMIN', 'MANAGER', 'USER']
		},
	},
	{
		path: '/users',
		name: 'manageUsers',
		components: {
			default: () => import('../views/users/ManageUsers.vue'),
			TopNavBar: () => import('../components/TopNavBar.vue'),
			Drawer: () => import('../views/users/UsersDrawer.vue'),
		},
		meta: {
			requiresAuth: true,
			haveAccess: ['ADMIN']
		}
	},
	{
		path: '/users/:userId',
		name: 'editUser',
		components: {
			default: () => import('../views/users/EditUser.vue'),
			TopNavBar: () => import('../components/TopNavBar.vue'),
			Drawer: () => import('../views/users/UsersDrawer.vue'),
		},
		meta: {
			requiresAuth: true,
			haveAccess: ['ADMIN']
		}
	},
];