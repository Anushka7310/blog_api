const Auth = require("./auth");
const Validation = require("../validations");
const { hash, compare } = require('bcrypt');
const _ = require("lodash")

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
                if(_.size(ctxBody.name)){
                    this.user.name = ctxBody.name
                }
                if(_.size(ctxBody.password)){
                    const hashedPassword = await hash(ctxBody.password, 10)
                    this.user.password = hashedPassword;
                }
                await this.user.save();
                this.ctx.body = { status: "Success"};
            } catch (error) {
                this.ctx.status = 400;
                this.ctx.body = { error: error.message };
            }
        }
}
module.exports = UserController;
