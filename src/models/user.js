import {Model} from './base.js';
import {get} from 'lodash';

export class User extends Model {
	
	static ROLE_ADMIN = 'ADMIN';
	static ROLE_MANAGER = 'MANAGER';
	static ROLE_USER = 'USER';
	
	id;
	username;
	role;
	email;
	full_name;
	profile_pic;
	password;
	confirm_password;
	
	constructor(attributes) {
		super();
		
		this.id = get(attributes, 'id', 0);
		this.username = get(attributes, 'username', '');
		this.role = get(attributes, 'role', 'USER');
		this.email = get(attributes, 'email', '');
		this.full_name = get(attributes, 'full_name', '');
		this.profile_pic = get(attributes, 'profile_pic', '');
		
		this.password = '';
		this.confirm_password = '';
	}
	
	isAdmin() {
		return this.role === User.ROLE_ADMIN;
	}
	
}