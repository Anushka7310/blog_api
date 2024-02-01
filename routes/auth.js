const Router = require("koa-router");
const authController = require("../controllers/auth")
let r = new Router();

r.post("/register", async (ctx, next) => {
	let ctr = new authController.AuthController(ctx, next);
	await ctr.executeMethod("register");
});
r.post("/login", async (ctx, next) => {
	let ctr = new authController.AuthController(ctx, next);
	await ctr.executeMethod("login");
});

module.exports = r;