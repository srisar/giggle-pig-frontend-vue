import {createRouter, createWebHistory} from 'vue-router';
import {pagesRoutes} from './pages.js';
import AuthService from '../services/authService.js';
import {usersRoutes} from './users.js';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			components: {
				default: () => import('../views/pages/HomeView.vue'),
				TopNavBar: () => import('../components/TopNavBar.vue'),
				Drawer: () => import('../components/CommonDrawer.vue'),
			},
			meta: {
				requiresAuth: true,
				haveAccess: ['ADMIN', 'MANAGER', 'USER']
			}
		},
		
		{
			path: '/login',
			name: 'login',
			component: () => import('../views/pages/LoginPage.vue'),
		},
		{
			path: '/logout',
			name: 'logout',
			component: () => import('../views/pages/LogoutPage.vue'),
		},
		...pagesRoutes,
		...usersRoutes,
	]
});


router.beforeEach(async (to, from) => {
	
	const loginState = await AuthService.isLoggedIn();
	
	if (to.meta['requiresAuth'] && !loginState) {
		console.log('auth not validated');
		
		return {
			path: '/login',
			query: {redirect: to.fullPath}
		};
		
	} else if (to.meta['requiresAuth'] && loginState) {
		const user = AuthService.getUser();
		
		if (!to.meta['haveAccess'].includes(user.role)) {
			return {
				path: '/login',
				query: {
					redirect: to.fullPath,
					message: 'access not granted'
				}
			};
		}
	}
	
});

export default router;
