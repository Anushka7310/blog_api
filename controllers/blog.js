const Auth = require("./auth")
const Validation = require("../validations");


class BlogController extends Auth{
    constructor(ctx, _next){
        super(ctx, _next);
        this._beforeMethods = {
		"createBlog": ["_secure"],
    }
}
    async createBlog(){
        try {
            console.log(this.user);
            const ctxBody = await Validation.Blog.blogSchema.validateAsync(this.ctx.request.body);
            const newBlog = new this.models.Blog({title : ctxBody.title, content : ctxBody.content , author: this.user._id});
            await newBlog.save();
            this.ctx.body = {status: "Success", newBlog};
        } catch (error) {
            this.ctx.status = 400;
            this.ctx.body = { error: error.message };
        }
    }

}

module.exports = BlogController;