const Joi = require('joi');

const userSchema = Joi.object({
    email: Joi.string().email().min(3).max(30),
    password: Joi.string().min(6).max(20),
    name: Joi.string().min(3).max(20)
});

module.exports = {
    userSchema
};
