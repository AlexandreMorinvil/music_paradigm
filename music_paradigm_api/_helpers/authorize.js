const expressJwt = require('express-jwt');
const { secret } = require('config.json');

module.exports = authorize;

/**
 * Middleware method to verify the jwt token and authorize a route according to the role
 * @param {string[]|string|} roles   Roles that are authorized on a route
 */
function authorize(roles = []) {
    
    // roles parameter can be a single role string (e.g. 'user') 
    // or an array of roles (e.g. ['administrator', 'user'])
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return [
        // A user must have been added to the HTTP request by the middleware "app.use(jwt())"
        // of the main entry point of the server. This user is then used for access authorization.
        (req, res, next) => {

            if (roles.length && !roles.includes(req.user.role)) {
                // user's role is not authorized
                return res.status(401).json({ message: 'Unauthorized' });
            }

            // Authorization successful
            next();
        }
    ];
}