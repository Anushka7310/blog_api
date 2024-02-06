const Joi = require('joi');

const loginSchema = Joi.object({
    password: Joi.string().min(8).max(20).required(),
    email   : Joi.string().email().required()
})

const registerSchema = Joi.object({
    name    : Joi.string().min(3).max(10).required(),
    password: Joi.string().min(8).max(20).required(),
    email   : Joi.string().email().required()
})

module.exports = {loginSchema, registerSchema};