const Router = require("koa-router");
const Controller = require("../controllers")
let r = new Router();
r.post("/blog", async (ctx, next) => {
	let ctr = new Controller.Blog(ctx, next);
	await ctr.executeMethod("createBlog");
});
r.get("/blog/:blogid", async (ctx, next) => {
	let ctr = new Controller.Blog(ctx, next);
	await ctr.executeMethod("getBlog", ctx.params.blogid);
});
r.get("/blogs",  async (ctx, next) => {
	let ctr = new Controller.Blog(ctx, next);
	await ctr.executeMethod("getAllBlogs");
});
r.put("/blog/:blogid", async (ctx, next) => {
	let ctr = new Controller.Blog(ctx, next);
	await ctr.executeMethod("updateBlog", ctx.params.blogid);
});
r.delete("/blog/:blogid",async (ctx, next) => {
	let ctr = new Controller.Blog(ctx, next);
	await ctr.executeMethod("deleteBlog", ctx.params.blogid);
});

module.exports = r;