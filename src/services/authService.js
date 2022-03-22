import AxiosService from './axiosService.js';
import {User} from '@/models/user.js';

const KEY_USER = 'x-gp-user';
const KEY_JWTOKEN = 'x-gp-jwt';

// const {fetchUser} = useUserAPI();

export default class AuthService {
	
	static #USER;
	static #TOKEN;
	
	/**
	 * Initialize login state from local storage and set
	 * authentication token for axios instance
	 */
	static init() {
		AuthService.#readLocalStorageValues();
		
		if (AuthService.#TOKEN !== null) {
			AxiosService.setAuthHeader(`Bearer ${AuthService.#TOKEN}`);
		}
		
		console.log('Auth service initialized...');
	}
	
	/**
	 * Attempt to log in using given username and password
	 * @param username
	 * @param password
	 * @returns {Promise<boolean>}
	 */
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
	
	/**
	 * Logout the current user, clear the local storage.
	 */
	static logout() {
		AuthService.#clearLocalStorage();
		AuthService.#readLocalStorageValues();
	}
	
	
	/**
	 * Check if there is an active login user in the system
	 * @returns {Promise<boolean>}
	 */
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
	 * Get the logged-in user instance
	 * @returns {User}
	 */
	static getUser() {
		if (AuthService.#USER) {
			return new User(AuthService.#USER);
		}
		return null;
	}
	
	/**
	 * Update the local store user data from api.
	 * Use this while updating current user data
	 */
	static async updateUser() {
		
		try {
			
			const response = await AxiosService.instance().post('/users/get.php', {
				id: id
			});
			
			const user = new User(response.data['payload']['user']);
			localStorage.setItem(KEY_USER, user.toString());
			
			AuthService.#readLocalStorageValues();
			
		} catch (e) {
			console.log(e);
		}
	}
	
	/*
	* PRIVATE METHODS
	* */
	
	static #writeLocalStorageValues(user, token) {
		localStorage.setItem(KEY_USER, user.toString());
		localStorage.setItem(KEY_JWTOKEN, token);
		
		AuthService.#readLocalStorageValues();
	}
	
	static #readLocalStorageValues() {
		AuthService.#USER = JSON.parse(localStorage.getItem(KEY_USER)) ?? null;
		AuthService.#TOKEN = localStorage.getItem(KEY_JWTOKEN) ?? null;
	}
	
	static #clearLocalStorage() {
		localStorage.removeItem(KEY_USER);
		localStorage.removeItem(KEY_JWTOKEN);
	}
	
	
}