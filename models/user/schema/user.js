const { Schema } = require("mongoose");

let schema = Schema({
    name: {
        type: String,
    },
    password: {
        type: String,
    },
    email: {
        type: String,
    }
});

module.exports = {schema}