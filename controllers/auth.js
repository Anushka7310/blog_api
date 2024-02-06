const { Base } = require('./base');
const jwt = require('jsonwebtoken');

const { hash, compare } = require('bcrypt');
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
        try {
            const ctxBody = await Validation.Auth.registerSchema.validateAsync(this.ctx.request.body);
            const user = await this.models.User.findOne({ email: ctxBody.email })
            if (user) {
                this.ctx.throw(400, "Email already exists");
            }
            const hashedPassword = await hash(ctxBody.password, 10);
            const newUser = new this.models.User({ email: ctxBody.email, password: hashedPassword, name: ctxBody.name });
            await newUser.save();
            const token = generateToken(newUser);
            this.ctx.body = { status: "success", token };
        } catch (error) {
            this.ctx.status = 400;
            this.ctx.body = { error: error.message };
        }
    }

    async login() {
        try {
            const ctxBody = await Validation.Auth.loginSchema.validateAsync(this.ctx.request.body);
            const user = await this.models.User.findOne({ email: ctxBody.email })
            if (!user) {
                this.ctx.throw(401, "Invalid username or password");
            }
            const validPassword = await compare(ctxBody.password, user.password)
            if (!validPassword) {
                this.ctx.throw(401, "Invalid username or password");
            }
            const token = generateToken(user);
            this.ctx.body = { status: "success", token };
        } catch (error) {
            this.ctx.status = 400;
            this.ctx.body = { error: error.message };
        }
    }
}

module.exports = AuthController;
