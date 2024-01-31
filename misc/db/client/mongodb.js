
const _ = require('lodash');
const mongoose = require('mongoose');

class MongodbClient {

	/**
	 * @constructor
	 * @param {object} config 
	 */
	constructor(config) {
		if (_.size(config.user) && _.size(config.pass)) {
			this._dbConnString = `mongodb://${config.user}:${config.pass}@${config.host}/${config.db}?${config.options}`;
		} else {
			this._dbConnString = `mongodb://${config.host}/${config.db}?${config.options}`;
		}
	}

	/**
	 * [PUBLIC] This method will create and return mongodb client connection.
	 * @param {object} options - Database options to be passed to mongodb connection
	 * @returns {mongoose.Connection}
	 */
	createConnection(options = {}) {
		let connOptions = _.merge({ useNewUrlParser: true }, options);
		return mongoose.createConnection(this._dbConnString, connOptions);
	}
}

module.exports = MongodbClient;