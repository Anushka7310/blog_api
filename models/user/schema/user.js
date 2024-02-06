const { Schema } = require("mongoose");

let schema = Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        bcrypt: true
    },
    email: {
        type: String,
        required: true,
		unique: true,
    }
});
schema.plugin(require('mongoose-bcrypt'));

module.exports = {schema}