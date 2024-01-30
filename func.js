function getEnvironment(set = false) {
	const env = process.env.NODE_ENV || 'development';
	return env;
}

function getConfig(env = "development", set = false) {
	const config = require(`./config/env/${env}.config.json`);
	return config;
}
module.exports = {getEnvironment, getConfig};