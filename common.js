const {getConfig, getEnvironment} = require("./func");

const config = getConfig(getEnvironment(true), true);
const mongoose = require('mongoose');

mongoose.connect(config.MONGO_URI)

const db = mongoose.connection;
db.on("connected", ()=> {
    console.log("mongodb connected successfully")
});
