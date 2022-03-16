import axios from 'axios';

// export const axiosInstance = axios.create({
// 	baseURL: 'http://localhost/api',
// 	headers: {}
// });

export default class AxiosService {
	
	
	static #CONFIG;
	static #AXIOS;
	
	static init(config) {
		AxiosService.#CONFIG = config;
		AxiosService.#AXIOS = axios.create(AxiosService.#CONFIG);
	}
	
	static setAuthHeader(authToken) {
		AxiosService.#AXIOS.defaults.headers.common['Authorization'] = authToken;
	}
	
	static instance() {
		return AxiosService.#AXIOS;
	}
	
}

