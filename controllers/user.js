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
        const userWithoutPassword = { ...this.user.toObject() };
        delete userWithoutPassword.password;
        this.ctx.body = { success: true, user: userWithoutPassword };
    }        

    async updateUser(){
        const {error, value} = await Validation.User.userSchema.validate(this.ctx.request.body);
        if (error) {
			let errorMessage = _.size(error.details) > 0 ? error.details[0].message : null;
			this.throwError("201", errorMessage);
		}
        if(_.size(value.name)){
            this.user.name = value.name
        }
        if(_.size(value.password)){
            this.user.password = value.password;
        }
        await this.user.save();
        this.ctx.body = { success: true, message: "User updated successfully"};
    }
}
module.exports = UserController;
