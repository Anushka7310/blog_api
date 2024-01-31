// Importing the Registry instance
const Registry = require("./misc/registery");
const _ = require('lodash');


// Other imports and configurations
const { getConfig, getEnvironment, connectMongo } = require("./func");
const config = getConfig(getEnvironment());

// Initializing default (Primary) mongodb and initializing models
const defaultMongodbClient = connectMongo("DefaultDbClient", config.storageDatabases.primary, true);
// Set default models
const schemaList = require("./models");
Registry.set("schemas", schemaList);
let models = {};
_.each(schemaList, (value, key) => {
	models[key] = defaultMongodbClient.model(key, value.schema);
});
Registry.set("models", models);