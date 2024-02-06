const MongoDbClient = require("./misc/db/client/mongodb");
const Registry = require("./misc/registry");

function getEnvironment() {
	const env = process.env.NODE_ENV || 'development';
	return env;
}

function getConfig(env = "development") {
	const config = require(`./config/env/${env}.config.json`);
	return config;
}

function connectMongo(name, config, set = false) {
	let dbConn = (new MongoDbClient(config)).createConnection({
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false
	});
	if (set) {
		Registry.set(name, dbConn);
	}
	return dbConn;
}

module.exports = {getEnvironment, getConfig, connectMongo};