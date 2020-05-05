const expressJwt = require('express-jwt');
const config = require('config.json');
const userService = require('../users/user.service');

module.exports = jwtMiddlewareAuthentication;

function jwtMiddlewareAuthentication() {
    const secret = config.secret;
    return expressJwt({ secret, isRevoked }).unless({
        // Public routes that don't require authentication
        path: [
            '/users/authenticate',
            '/static/'
        ]
    });
}

async function isRevoked(req, payload, done) {
    // Verify that the user still exists
    const user = await userService.getById(payload.sub);

    // Revoke the token if the user no longer exists
    if (!user) {
        return done(null, true);
    }

    done();
};