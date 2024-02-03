const Joi = require('joi');

const userSchema = Joi.object({
    email: Joi.string().email(),
    password: Joi.string().min(6),
    name: Joi.string()
});

module.exports = {
    userSchema
};
