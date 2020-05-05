const jsonWebToken = require('jsonwebtoken');
const config = require('config.json');

module.exports = {
    generateToken
};

function generateToken(user) {
    // Creation of the jwt token
    const token = jsonWebToken.sign(
        {
            sub: user._id,
            role: user.role
        },
        config.secret);
    return token;
}