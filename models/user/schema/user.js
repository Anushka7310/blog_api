const { Schema } = require("mongoose");

let schema = Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
		unique: true,
    }
});

module.exports = {schema}