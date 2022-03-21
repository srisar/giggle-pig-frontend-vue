import {Model} from './base.js';

export class User extends Model {
	
	id;
	username;
	role;
	full_name;
	profile_pic;
	new_password; /* the field is used to store a new password for update password option */
	
	
	static ROLE_ADMIN = 'ADMIN';
	static ROLE_MANAGER = 'MANAGER';
	static ROLE_USER = 'USER';
	
	constructor(attributes) {
		super();
		
		this.id = attributes['id'] ?? 0;
		this.username = attributes['username'] ?? '';
		this.role = attributes['role'] ?? 'USER';
		this.email = attributes['email'] ?? '';
		this.full_name = attributes['full_name'] ?? '';
		this.profile_pic = attributes['profile_pic'] ?? '';
	}
	
}