const jwt = require('jsonwebtoken');
const {getConfig, getEnvironment} = require("../func");
const config = getConfig(getEnvironment());
function generateToken(user){
    return jwt.sign({id: user.id}, config.SECRET_KEY, {expiresIn: "1d"})
}
module.exports = generateToken;