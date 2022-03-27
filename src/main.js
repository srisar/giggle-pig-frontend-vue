import {createApp} from 'vue';
import {createPinia} from 'pinia';

import './index.css';

import App from './App.vue';
import router from './router';
import AxiosService from './services/axiosService.js';
import AuthService from './services/authService.js';


/* - Initializing services before loading the vue app - */

AxiosService.init({
	baseURL: 'http://localhost/api',
	// baseURL: 'http://192.168.1.19/api', /* local network debug */
});

AuthService.init();

/* - Initializing services before loading the vue app - */

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
