const Router = require("koa-router");
const Controller = require("../controllers")
let r = new Router();

r.post("/register", async (ctx, next) => {
	let ctr = new Controller.Auth(ctx, next);
	await ctr.executeMethod("register");
});
r.post("/login", async (ctx, next) => {
	let ctr = new Controller.Auth(ctx, next);
	await ctr.executeMethod("login");
});

module.exports = r;