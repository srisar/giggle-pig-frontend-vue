import {reactive} from 'vue';
import AxiosService from '../services/axiosService.js';
import {User} from '../models/user.js';


export function useUserAPI() {
	
	const useUserState = reactive({
		/**
		 * @type{User | null}
		 */
		currentUser: null,
	});
	
	async function fetchUser(id) {
		try {
			const response = await AxiosService.instance().post('/users/get.php', {
				id: id
			});
			
			useUserState.currentUser = new User(response.data['payload']['user']);
			
		} catch (e) {
			console.log(e);
			return e;
		}
	}
	
	return {
		useUserState, fetchUser,
	};
}