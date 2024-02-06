const { Base } = require('./base');
const jwt = require('jsonwebtoken');
const _ = require("lodash");

const { compare } = require('bcrypt');
const generateToken = require("../services/auth")
const Validation = require("../validations")

class AuthController extends Base {
    constructor(ctx, _next) {
        super(ctx, _next);
    }
    
    async _secure(){
        let payload = null, token = this.ctx.headers["api-key"] || null;
        if(!token){
            this.ctx.throw(401,"Please login to continue")
        }
        try {
            payload = jwt.verify(token, this.config.SECRET_KEY);
            let user = await this.models.User.findOne({ _id: payload.id });
            this.user = user;
        } catch (error) {
            this.throwError("102", "Authentication token expired, Please re-login to continue using the dashboard");
        }
        
    }


    async register() {
        const {error, value} = await Validation.Auth.registerSchema.validate(this.ctx.request.body);
        if (error) {
			let errorMessage = _.size(error.details) > 0 ? error.details[0].message : null;
			this.throwError("201", errorMessage);
		}
        const user = await this.models.User.findOne({ email: value.email })
        if (user) {
            this.throwError("400", "Email already exists");
        }
        const newUser = new this.models.User({ email: value.email, password: value.password, name: value.name });
        await newUser.save();
        const token = generateToken(newUser);
        this.ctx.body = { success: true, data: {token} };
    }

    async login() {
        const {error, value} = await Validation.Auth.loginSchema.validate(this.ctx.request.body);
        if (error) {
			let errorMessage = _.size(error.details) > 0 ? error.details[0].message : null;
			this.throwError("201", errorMessage);
		}
        const user = await this.models.User.findOne({ email: value.email })
        if (!user) {
            this.throwError("401", "Invalid username or password");
        }
        const validPassword = await compare(value.password, user.password)
        if (!validPassword) {
            this.ctx.throw("401", "Invalid username or password");
        }
        const token = generateToken(user);
        this.ctx.body = { success: true, data: {token} };
    }
}

module.exports = AuthController;
