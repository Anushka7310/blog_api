const Router = require("koa-router");
const authController = require("../controllers/auth")
let r = new Router();

r.post("/register", authController.register);
r.post("/login", authController.login);

module.exports = r;