const Koa = require('koa');
const bodyParser = require('koa-bodyparser')
const {getConfig, getEnvironment} = require("./func");
const _ = require("lodash")
require("./common.js");

const config = getConfig(getEnvironment());
const app = new Koa();

app.use(bodyParser());

// Initializing application routes
const routesList = require('./routes');
_.each(routesList, (router, key) => {
	app.use(router.routes());
	app.use(router.allowedMethods());
});


app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});