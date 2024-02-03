const Router = require("koa-router");
const Controller = require("../controllers")
let r = new Router();

r.get("/user", async (ctx, next) => {
	let ctr = new Controller.User(ctx, next);
	await ctr.executeMethod("getUser");
});

r.put("/user", async (ctx, next) => {
	let ctr = new Controller.User(ctx, next);
	await ctr.executeMethod("updateUser");
});

module.exports = r;