const { hash, compare } = require('bcrypt');
const User = require("../models/user/schema/user")
const generateToken = require("../services/auth")
const {loginSchema, registerSchema} = require("../validations/auth")

async function register(ctx){ 
    try {
    const ctxBody = await registerSchema.validateAsync(ctx.request.body);
    const user = await User.findOne({email: ctxBody.email})
    if(user){
        ctx.throw(400, "Email already exists");
    }
    const hashedPassword = await hash(ctxBody.password, 10);
    const newUser = new User({email: ctxBody.email, password: hashedPassword, name: ctxBody.name});
    await newUser.save();
    const token = generateToken(newUser);
    ctx.body = {status : "success", token};
    } catch (error) {
        ctx.status = 400;
        ctx.body = {error: error.message};
    }
}

async function login(ctx){ 
   try {
    const ctxBody = await loginSchema.validateAsync(ctx.request.body);
    const user = await User.findOne({email: ctxBody.email})
    console.log(user);
    if(!user){
        ctx.throw(401, "Invalid username or password");
    }
    const validPassword = await compare(ctxBody.password, user.password)
    console.log(validPassword);
    if(!validPassword){
        ctx.throw(401, "Invalid username or password");
    }
    const token = generateToken(user);
    ctx.body = {status : "success", token};
   } catch (error) {
    ctx.status = 400;
    ctx.body = {error: error.message};
   }
}
module.exports = {register, login};