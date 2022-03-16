import {createRouter, createWebHistory} from 'vue-router';
import HomeView from '../views/HomeView.vue';
import {pagesRoutes} from './pages.js';
import AuthService from '../services/authService.js';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView
		},
		
		{
			path: '/login',
			name: 'login',
			component: () => import('../views/pages/LoginPage.vue'),
		},
		...pagesRoutes
	]
});


router.beforeEach(async (to, from) => {
	
	if (to.meta.requiresAuth && !await AuthService.isLoggedIn()) {
		console.log('auth not validated');
		return {
			path: '/login'
		};
	}
	
});

export default router;
