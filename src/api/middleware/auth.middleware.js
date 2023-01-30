const { StatusCodes } = require('http-status-codes');
const { sendErrorResponse } = require('../../utils/response');
const jwt = require('jsonwebtoken');
const logger = require('../../utils/loggers/logger');

module.exports = class AuthMiddleware {
    static checkRole(role) {
        return async (req, res, next) => {
            if (req.method === 'OPTION') {
                return next();
            }
            AuthMiddleware.isAuthorized(req, res, () => {
                if (req.user.role !== role) {
                    return sendErrorResponse(res, StatusCodes.FORBIDDEN);
                }
                next();
            })
        }
    }

    static async isAuthorized(req, res, next) {
        if (req.method === 'OPTION') {
            return next();
        }
        try {
            const token = req.headers.authorization;
            if (!token) {
                return sendErrorResponse(res, StatusCodes.UNAUTHORIZED, "not a valid token");
            }
            req.user = jwt.verify(token, process.env.JWT_SECRET);
            next();
        } catch (err) {
            logger.warn(err);
            return sendErrorResponse(res, StatusCodes.UNAUTHORIZED, err);
        }
    }
}