const Auth = require("./auth");
const Validation = require("../validations");

class BlogController extends Auth {
    constructor(ctx, _next) {
        super(ctx, _next);
        this._beforeMethods = {
            "createBlog": ["_secure"],
            "updateBlog": ["_secure"],
            "getBlog": ["_secure"],
            "getAllBlogs": ["_secure"],
            "deleteBlog": ["_secure"]
        };
    }

    async createBlog() {
        try {
            console.log(this.user);
            const ctxBody = await Validation.Blog.blogSchema.validateAsync(this.ctx.request.body);
            const newBlog = new this.models.Blog({
                title: ctxBody.title,
                content: ctxBody.content,
                author: this.user._id
            });
            await newBlog.save();
            this.ctx.body = { status: "Success", newBlog };
        } catch (error) {
            this.ctx.status = 400;
            this.ctx.body = { error: error.message };
        }
    }

    async updateBlog() {
        try {
            const blogId = this.ctx.params.blogid;
            const ctxBody = await Validation.Blog.blogSchema.validateAsync(this.ctx.request.body);
            const blog = await this.models.Blog.findById(blogId);
            if (!blog) {
                throw new Error("Blog not found");
            }
            if (!blog.author.equals(this.user._id)) {
                throw new Error("You are not authorized to update this blog");
            }
            const updatedBlog = await this.models.Blog.findByIdAndUpdate(
                blogId,
                { $set: { title: ctxBody.title, content: ctxBody.content, author: this.user._id } },
                { new: true }
            );
            if (!updatedBlog) {
                throw new Error("Blog not found");
            }
            this.ctx.body = { status: "Success", updatedBlog };
        } catch (error) {
            this.ctx.status = 400;
            this.ctx.body = { error: error.message };
        }
    }

    async getBlog() {
        try {
            const blogId = this.ctx.params.blogid;
            const blog = await this.models.Blog.findById(blogId);
            if (!blog) {
                throw new Error("Blog not found");
            }
            this.ctx.body = { status: "Success", blog };
        } catch (error) {
            this.ctx.status = 400;
            this.ctx.body = { error: error.message };
        }
    }

    async getAllBlogs() {
        try {
            const blogs = await this.models.Blog.find();
            if (!blogs) {
                throw new Error("Blog not found");
            }
            this.ctx.body = { status: "Success", blogs };
        } catch (error) {
            this.ctx.status = 400;
            this.ctx.body = { error: error.message };
        }
    }

    async deleteBlog() {
        try {
            const blogId = this.ctx.params.blogid;
            const blog = await this.models.Blog.findById(blogId);
            if (!blog) {
                throw new Error("Blog not found");
            }
            if (!blog.author.equals(this.user._id)) {
                throw new Error("You are not authorized to update this blog");
            }
            await blog.remove()
            this.ctx.body = { status: "Success", message: "Blog deleted successfully" };
        } catch (error) {
            this.ctx.status = 400;
            this.ctx.body = { error: error.message };
        }
    }
}

module.exports = BlogController;
