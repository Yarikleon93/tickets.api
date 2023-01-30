const { StatusCodes } = require('http-status-codes');
const authService = require('../../core/services/auth.service');
const userService = require('../../core/services/user.service');
const { sendErrorResponse } = require('../../utils/response');
const logger = require('../../utils/loggers/logger');
const Role = require('../../core/enums/roles.enum');

module.exports = class AuthController {
    static async login(req, res) {
        const { email, password } = req.body;
        try {
            const user = await userService.getUserByEmail(email);
            if (req.headers.origin === process.env.ADMIN_URL && (!user || user.role !== Role.ADMIN))
                return sendErrorResponse(res, StatusCodes.FORBIDDEN, 'You have no access');
            const data = await authService.login(email, password);
            return res.status(StatusCodes.OK).json(data);
        } catch (err) {
            logger.warn(err.message);
            return sendErrorResponse(res, StatusCodes.UNAUTHORIZED, err.message);
        }
    }

    static async register(req, res) {
        try {
            const data = await authService.register(req.body);
            res.status(StatusCodes.OK).json(data);
        } catch (err) {
            logger.warn(err.message);
            return sendErrorResponse(res, StatusCodes.UNAUTHORIZED, err.message);
        }
    }
}