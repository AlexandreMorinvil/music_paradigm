// Exporting the middleware function
module.exports = jwtMiddlewareAuthorization;

/**
 * Middleware to enforce role based authentication on the routes of the server.
 * 
 * The JWT token must have been parsed and attached to the req prior to using this
 * middleware.
 * @module jwtMiddlewareAuthorization
 * @function
 * @param {Object}      req                 Express request object
 * @param {Object}      res                 Express response object
 * @param {String}      req.user.role       The the role of the user as decoded by 
 *                                          the jwt authentication middleware 
 * @param {Function}    next                Next middleware function
 * @param {string[]|string|undefined} roles Roles that are authorized on a route.
 *                                          When undefined, all roles are authorized.
 * @return {undefined}
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