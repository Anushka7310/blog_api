const Auth = require("./auth");
const Validation = require("../validations");


class UserController extends Auth {
    constructor(ctx, _next){
        super(ctx, _next);
        this._beforeMethods = {
            "getUser": ["_secure"],
            "updateUser": ["_secure"]
        }
        }
        async getUser() {
            try {
                const userWithoutPassword = { ...this.user.toObject() };
                delete userWithoutPassword.password;
                this.ctx.body = { status: "Success", user: userWithoutPassword };
            } catch (error) {
                this.ctx.status = 500;
                this.ctx.body = { error: "Internal Server Error" };
            }
        }        

        async updateUser(){
            try {
                const ctxBody = await Validation.User.userSchema.validateAsync(this.ctx.request.body);
                const updatedUser = await this.models.User.findByIdAndUpdate(
                this.user._id,
                { $set: { name: ctxBody.name, password: ctxBody.password} },
                { new: true }
                );
                this.ctx.body = { status: "Success", updatedUser };
            } catch (error) {
                this.ctx.status = 400;
                this.ctx.body = { error: error.message };
            }
        }
}
module.exports = UserController;