import AxiosService from './axiosService.js';
import {User} from '../models/user.js';

export default class AuthService {
	
	static #USER;
	static #TOKEN;
	
	static init() {
		AuthService.#readLocalStorageValues();
		
		if (AuthService.#TOKEN !== null) {
			AxiosService.setAuthHeader(`Bearer ${AuthService.#TOKEN}`);
		}
		
		console.log('Auth service initialized...');
	}
	
	static async login(username, password) {
		
		try {
			const response = await AxiosService.instance().post('/auth/login.php', {
				username, password
			});
			
			const token = response.data['payload']['jwt'];
			
			AuthService.#writeLocalStorageValues(new User(response.data['payload']), token);
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
		if (!AuthService.#USER || !AuthService.#TOKEN) {
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
	
	
	/**
	 *
	 * @returns {User}
	 */
	static getUser() {
		if (AuthService.#USER) {
			return new User(AuthService.#USER);
		}
		return null;
	}
	
	
	/* PRIVATE METHODS */
	
	static #writeLocalStorageValues(user, token) {
		localStorage.setItem('x-app-user', user.toString());
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