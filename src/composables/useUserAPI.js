import AxiosService from '../services/axiosService.js';
import {User} from '../models/user.js';
import AuthService from '../services/authService.js';


export function useUserAPI() {
	
	/**
	 * Fetch user by the id
	 * @param id {number}
	 * @returns {Promise<User>}
	 */
	async function fetchUser(id) {
		
		/* if id is as same as the current user, then get the data from auth service */
		if (id === AuthService.getUser().id) {
			return AuthService.getUser();
		} else {
			
			const response = await AxiosService.instance().post('/users/get.php', {
				id: id
			});
			
			return new User(response.data['payload']['user']);
		}
	}
	
	/**
	 * Update the user
	 * @param user {User}
	 * @returns {Promise<void>}
	 */
	async function updateUser(user) {
		return await AxiosService.instance().post('/users/update.php', {
			id: user.id,
			full_name: user.full_name,
			username: user.username,
			email: user.email,
			role: user.role,
		});
	}
	
	return {
		fetchUser, updateUser
	};
}