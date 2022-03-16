import {useStorage} from '@vueuse/core';
import AxiosService from './axiosService.js';
import {reactive} from 'vue';

export default class AuthService {
	
	static USER;
	static TOKEN;
	
	static init() {
		AuthService.USER = JSON.parse(localStorage.getItem('x-app-user')) ?? null;
		AuthService.TOKEN = localStorage.getItem('x-app-token') ?? null;
		
		if (AuthService.TOKEN !== null) {
			AxiosService.setAuthHeader(`Bearer ${AuthService.TOKEN}`);
		}
		
		console.log('Auth service initialized...');
	}
	
	static async login(username, password) {
		
		try {
			const response = await AxiosService.instance().post('/auth/jwt-login.php', {
				username, password
			});
			
			const user = {
				username: response.data['payload']['username'],
				email: response.data['payload']['email'],
				role: response.data['payload']['role'],
			};
			
			const token = response.data['payload']['jwt'];
			
			localStorage.setItem('x-app-user', JSON.stringify(user));
			localStorage.setItem('x-app-token', token);
			
			AxiosService.setAuthHeader(`Bearer ${AuthService.TOKEN}`);
			
			return true;
			
		} catch (e) {
			throw e;
		}
		
	}
	
	
	static async isLoggedIn() {
		
		if (AuthService.USER == null || AuthService.TOKEN == null) {
			return false;
		}
		
		try {
			await AxiosService.instance().post('/auth/authenticate.php');
			return true;
			
		} catch (e) {
			return false;
		}
	}
	
}