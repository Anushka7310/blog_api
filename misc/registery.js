class Registry {
	constructor() {
		this._data = {};
	}

/**
 * [PUBLIC]  this function is used to set the data in key
 * @param {string} key -  the data is set in key
 * @param {string} value - string value
 */
	set(key, value = null) {
		this._data[key] = value;
	}
	
/**
 * [PUBLIC] This function is used to get the data
 * @param {string} key -   data is stored in the key
 * @param {string} defValue -  data in defvalue
 * @returns {string}
 */
	get(key, defValue = null) {
		return this._data[key] || defValue;
	}
	
/**
 * [PUBLIC] this function is used to delete the data
 * @param {string} key -  key with data
 */
	delete(key) {
		delete this._data[key];
	}
}

module.exports = new Registry();