const Router = require("koa-router");
const Controller = require("../controllers")
let r = new Router();
r.post("/blog", async (ctx, next) => {
	let ctr = new Controller.Blog(ctx, next);
	await ctr.executeMethod("createBlog");
});
r.get("/blog/:blogid", async (ctx, next) => {
	let ctr = new Controller.Blog(ctx, next);
	await ctr.executeMethod("getBlog");
});
r.get("/blogs",  async (ctx, next) => {
	let ctr = new Controller.Blog(ctx, next);
	await ctr.executeMethod("getAllBlogs");
});
r.put("/blog/:blogid", async (ctx, next) => {
	let ctr = new Controller.Blog(ctx, next);
	await ctr.executeMethod("updateBlog");
});
r.delete("/blog/:blogid",async (ctx, next) => {
	let ctr = new Controller.Blog(ctx, next);
	await ctr.executeMethod("deleteBlog");
});

module.exports = r;