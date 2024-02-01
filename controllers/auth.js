const { Base } = require('./base');

const { hash, compare } = require('bcrypt');
const generateToken = require("../services/auth")
const { loginSchema, registerSchema } = require("../validations/auth")

class AuthController extends Base {
    constructor(ctx, _next) {
        super(ctx, _next);
    }

    async register() {
        try {
            const ctxBody = await registerSchema.validateAsync(this.ctx.request.body);
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
            const ctxBody = await loginSchema.validateAsync(this.ctx.request.body);
            const user = await this.models.User.findOne({ email: ctxBody.email })
            console.log(user);
            if (!user) {
                this.ctx.throw(401, "Invalid username or password");
            }
            const validPassword = await compare(ctxBody.password, user.password)
            console.log(validPassword);
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
