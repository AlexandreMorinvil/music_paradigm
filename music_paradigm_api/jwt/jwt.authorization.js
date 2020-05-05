const expressJwt = require('express-jwt');
const { secret } = require('config.json');

module.exports = jwtMiddlewareAuthorization;

/**
 * Middleware method to verify the jwt token and authorize a route according to the role
 * @param {string[]|string|} roles   Roles that are authorized on a route
 */
function jwtMiddlewareAuthorization(roles = []) {

    // The parameter roles can be a single role string (e.g. 'user') or an array of roles 
    // (e.g. ['administrator', 'user'])
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return [
        // A user must have been added to the HTTP request by the authentication middleware used in 
        // the main entry point of the server. This user is then checked for access authorization.
        function (req, res, next) {

            if (roles.length && !roles.includes(req.user.role)) {
                // The user's role does not grant authorization
                return res.status(401).json({ message: 'Unauthorized' });
            }

            // The user's role successfully grant authorization
            next();
        }
    ];
}