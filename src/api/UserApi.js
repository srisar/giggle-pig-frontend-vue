import {User} from '@/models/user.js';
import AuthService from '@/services/authService.js';
import AxiosService from '@/services/axiosService.js';

export default class UserApi {
	
	static roles = {
		'USER': 'User',
		'MANAGER': 'Manager',
		'ADMIN': 'Administrator',
	};
	
	/**
	 * Fetch user by the id
	 * @param id {number}
	 * @param forced {boolean}
	 * @returns {Promise<User>}
	 */
	static async fetchUser(id, forced = false) {
		
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
	 * @return {Promise<User[]>}
	 */
	static async fetchUsers(status = 'ACTIVE') {
		const response = await AxiosService.instance().post('/users/filter-by-status.php', {
			status
		});
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
	static async createUser(user) {
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
	static async updateUser(user) {
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
	static async updatePassword(userId, newPassword) {
		return await AxiosService.instance().post('/users/update-password.php', {
			id: userId,
			new_password: newPassword
		});
	}
	
	/**
	 *
	 * @param user {User}
	 */
	static async setAsActive(user) {
		return await AxiosService.instance().post('/users/update-status.php', {
			id: user.id,
			status: User.STATUS_ACTIVE
		});
	}
	
	/**
	 *
	 * @param user {User}
	 */
	static async setAsInactive(user) {
		return await AxiosService.instance().post('/users/update-status.php', {
			id: user.id,
			status: User.STATUS_INACTIVE
		});
	}
	
	static async deleteUser(user) {
		return await AxiosService.instance().post('/users/delete.php', {
			id: user.id,
		});
	}
	
	
}