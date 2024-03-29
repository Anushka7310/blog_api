const Auth = require("./auth");
const Validation = require("../validations");
const _ = require("lodash");

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
        const {error, value} = Validation.Blog.blogSchema.validate(this.ctx.request.body);
        if (error) {
			let errorMessage = _.size(error.details) > 0 ? error.details[0].message : null;
			this.throwError("201", errorMessage);
		}
            const newBlog = new this.models.Blog({
                title: value.title,
                content: value.content,
                author: this.user._id
            });
            await newBlog.save();
            this.ctx.body = { 
                success: true,
                message: "Blog created successfully",
                 data: {
                    blog: newBlog
                } 
            };
    }

    async updateBlog(blogId) {
        const {error, value} = Validation.Blog.blogSchema.validate(this.ctx.request.body);
        if (error) {
			let errorMessage = _.size(error.details) > 0 ? error.details[0].message : null;
			this.throwError("201", errorMessage);
		}
        const blog = await this.models.Blog.findOne({_id: blogId});
        if (!blog) {
            this.throwError("404", "Invalid Blog ID");
        }
        if (!blog.author.equals(this.user._id)) {
            this.throwError("401", "You are not authorized to update this blog");
        }
        blog.title = value.title;
        blog.content = value.content
        await blog.save();
        this.ctx.body = {
             success: true, 
             message: "Blog updated successfully",
              data: {
                blog
              } 
            };
    }

    async getBlog(blogId) {
        const blog = await this.models.Blog.findOne({_id: blogId});
        if (!blog) {
            this.throwError("404", "Invalid Blog ID");
        }
        this.ctx.body = { 
            success: true,
            data : {
                blog
            } 
            };
    }

    async getAllBlogs() {
        let filterQuery = { };
		if (this.ctx.query["title"] && _.size(this.ctx.query["title"]) > 0) {
			filterQuery["title"] = { $regex: this.ctx.query["title"], $options: 'i' };
		}
		if (this.ctx.query["content"] && _.size(this.ctx.query["content"]) > 0) {
			filterQuery["content"] = { $regex: this.ctx.query["content"], $options: 'i' };
		}
        const page = _.parseInt(this.ctx.query.page || 1),
			limit = _.parseInt(this.ctx.query.limit || 100),
			skip = (page - 1) * limit;
        const blogs = await this.models.Blog.find(filterQuery).skip(skip).sort({ created: -1 }).limit(limit).maxTimeMS(10000);
        const count = await this.models.Blog.countDocuments(filterQuery).maxTimeMS(10000);
        const total = await this.models.Blog.countDocuments().maxTimeMS(10000);
        this.ctx.body = {
             success: true,
              data: {
                blogs,
                pagination: {
					page, limit, total, count
				},
              } 
            };
    }

    async deleteBlog(blogId) {
        const blog = await this.models.Blog.findOne({_id:   blogId});
        if (!blog) {
            this.throwError("404", "Invalid Blog ID");
        }
        if (!blog.author.equals(this.user._id)) {
            this.throwError("401", "You are not authorized to update this blog");
        }
        await blog.remove()
        this.ctx.body = { 
            success: true,
            message: "Blog deleted successfully"
        };
    }
}

module.exports = BlogController;
