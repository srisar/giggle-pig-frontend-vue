import {defaultsDeep} from 'lodash';

export class Model {
	
	defaults = {};
	
	constructor(attributes = {}, defaults) {
		this.defaults = defaults;
		defaultsDeep(this, attributes, this.defaults);
	}
	
}