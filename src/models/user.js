import {Model} from './base.js';
import {defaultsDeep} from 'lodash';


export class User {
	
	static ROLE_ADMIN = 'ADMIN';
	static ROLE_MANAGER = 'MANAGER';
	static ROLE_USER = 'USER';
	
	constructor(attributes) {
		this.id = attributes['id'] ?? 0;
		this.username = attributes['username'] ?? '';
		this.role = attributes['role'] ?? 'USER';
		this.email = attributes['email'] ?? '';
		this.full_name = attributes['full_name'] ?? '';
		this.profile_pic = attributes['profile_pic'] ?? '';
	}
	
}