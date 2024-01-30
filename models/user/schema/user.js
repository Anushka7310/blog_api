const { Schema, default: mongoose } = require("mongoose");

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

module.exports = mongoose.model("User", schema);
