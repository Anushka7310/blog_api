const Koa = require('koa');
const bodyParser = require('koa-bodyparser')
const authRoutes = require('./routes/auth')
const blogRoutes = require('./routes/blog.js')
const {getConfig, getEnvironment} = require("./func");
require("./common.js");

const config = getConfig(getEnvironment());
const app = new Koa();

app.use(bodyParser());
app.use(authRoutes.routes()).use(authRoutes.allowedMethods());
app.use(blogRoutes.routes()).use(blogRoutes.allowedMethods());
app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});