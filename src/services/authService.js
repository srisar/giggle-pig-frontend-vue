import {useStorage} from '@vueuse/core';
import AxiosService from './axiosService.js';
import {reactive} from 'vue';

export default class AuthService {
	
	static #USER;
	static #TOKEN;
	
	static init() {
		AuthService.#readLocalStorageValues();
		
		if (AuthService.#TOKEN !== null) {
			AxiosService.setAuthHeader(`Bearer ${AuthService.#TOKEN}`);
		}
		
		console.log('Auth service initialized...');
		console.log(AuthService.#USER);
		console.log(AuthService.#TOKEN);
	}
	
	static async login(username, password) {
		
		try {
			const response = await AxiosService.instance().post('/auth/login.php', {
				username, password
			});
			
			const user = {
				username: response.data['payload']['username'],
				fullName: response.data['payload']['full_name'],
				email: response.data['payload']['email'],
				role: response.data['payload']['role'],
				profilePic: response.data['payload']['profile_pic'],
			};
			
			const token = response.data['payload']['jwt'];
			
			AuthService.#writeLocalStorageValues(user, token);
			
			AxiosService.setAuthHeader(`Bearer ${AuthService.#TOKEN}`);
			
			return true;
			
		} catch (e) {
			throw e;
		}
		
	}
	
	static logout() {
		AuthService.#clearLocalStorage();
		AuthService.#readLocalStorageValues();
	}
	
	
	static async isLoggedIn() {
		
		/* trying to see if the data is in localStorage */
		if (AuthService.#USER == null || AuthService.#TOKEN == null) {
			return false;
		}
		
		/* trying to authenticate the existing token with server */
		try {
			await AxiosService.instance().post('/auth/authenticate.php');
			return true;
		} catch (e) {
			return false;
		}
	}
	
	
	static async getUser() {
		if (await AuthService.isLoggedIn()) {
			return AuthService.#USER;
		}
		return null;
	}
	
	
	/* PRIVATE METHODS */
	
	static #writeLocalStorageValues(user, token) {
		localStorage.setItem('x-app-user', JSON.stringify(user));
		localStorage.setItem('x-app-token', token);
		
		AuthService.#readLocalStorageValues();
	}
	
	static #readLocalStorageValues() {
		AuthService.#USER = JSON.parse(localStorage.getItem('x-app-user')) ?? null;
		AuthService.#TOKEN = localStorage.getItem('x-app-token') ?? null;
	}
	
	static #clearLocalStorage() {
		localStorage.removeItem('x-app-user');
		localStorage.removeItem('x-app-token');
	}
	
	
}