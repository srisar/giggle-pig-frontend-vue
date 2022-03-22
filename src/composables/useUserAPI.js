import AxiosService from '../services/axiosService.js';
import {User} from '../models/user.js';
import AuthService from '../services/authService.js';


export function useUserAPI() {
	
	const roles = {
		'USER': 'User',
		'MANAGER': 'Manager',
		'ADMIN': 'Administrator',
	};
	
	/**
	 * Fetch user by the id
	 * @param id {number}
	 * @param forced
	 * @returns {Promise<User>}
	 */
	async function fetchUser(id, forced = false) {
		
		/* if id is as same as the current user, then get the data from auth service */
		if (!forced && id === AuthService.getUser().id) {
			return AuthService.getUser();
		} else {
			
			const response = await AxiosService.instance().post('/users/get.php', {
				id: id
			});
			
			return new User(response.data['payload']['user']);
		}
	}
	
	/**
	 * Fetch all the users in the system
	 */
	async function fetchUsers() {
		const response = await AxiosService.instance().post('/users/all.php');
		const users = response.data['payload'];
		
		const usersList = [];
		users.forEach(u => {
			usersList.push(new User(u));
		});
		return usersList;
	}
	
	/**
	 * Adds a new user
	 */
	async function createUser(user) {
		await AxiosService.instance().post('/users/create.php', {
			full_name: user.full_name,
			username: user.username,
			password: user.password,
			email: user.email,
			role: user.role,
		});
	}
	
	/**
	 * Update the user
	 * @param user {User}
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
	
	/**
	 * Updates the user password
	 * @param userId
	 * @param newPassword
	 */
	async function updatePassword(userId, newPassword) {
		return await AxiosService.instance().post('/users/update-password.php', {
			id: userId,
			new_password: newPassword
		});
	}
	
	
	// onMounted(async () => {
	// 	users.value = await fetchUsers();
	// });
	
	
	/**
	 * Return values
	 */
	return {
		fetchUser,
		fetchUsers,
		createUser,
		updateUser,
		updatePassword,
		roles,
	};
}