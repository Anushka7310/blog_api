const Joi = require('joi')

const blogSchema = Joi.object({
    title: Joi.string().min(3).max(32).required(),
    content: Joi.string().min(20).max(200).required(),
})

module.exports = {blogSchema};