const Router = require("koa-router");
const Controller = require("../controllers")
let r = new Router();
r.post("/blog", async (ctx, next) => {
	let ctr = new Controller.Blog(ctx, next);
	await ctr.executeMethod("createBlog");
});
r.get("/blog/:blogid", ctx => {
    ctx.body = 'Hello World';
});
r.get("/blogs", ctx => {
    ctx.body = 'Hello World';
});
r.put("/blog/:blogid", ctx => {
    ctx.body = 'Hello World';
});
r.delete("/blog/:blogid", ctx => {
    ctx.body = 'Hello World';
});

module.exports = r;