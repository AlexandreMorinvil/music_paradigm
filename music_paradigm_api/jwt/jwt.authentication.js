const expressJwt = require('express-jwt');
const config = require('config.json');
const userService = require('../users/user.service');

// Exporting the middleware function
module.exports = jwtMiddlewareAuthentication;

/**
 * Middleware to enforce verify the validity of a token
 * @module jwtMiddlewareAuthentication
 * @function
 * @param {Object}      req     Express request object
 * @param {Object}      res     Express response object
 * @param {Function}    next    Next middleware function
 * @return {undefined}
 */
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

/**
* Indicates a disconnection to the database and reattemp connection after a delay
* @callback isRevoked
* @param {Object}      req      Express request object
* @param {Object}      payload  Express response object
* @param {Function}    done     Function to confirm the validity or indicate the 
*                               invalidity of the token
*/
async function isRevoked(req, payload, done) {
    try {
        // Verify that the user still exists
        const user = await userService.getById(payload.sub);
    } catch (err) {
        // If an error occurs, it should be related to a timeout,
        // meaning that the database can not being accessed
        return done("Timeout : Unable to query the database to validate token", true);
    }
    
    // Revoke the token if the user no longer exists
    if (!user) {
        return done(null, true);
    }

    // Validate the existence of the user
    done();
};