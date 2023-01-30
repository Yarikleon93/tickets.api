const { StatusCodes } = require("http-status-codes");
const logger = require('../../utils/loggers/logger');
const userService = require("../../core/services/user.service");
const authService = require("../../core/services/auth.service");
const { sendErrorResponse } = require("../../utils/response");

module.exports = class UsersController {
  static async getUser(req, res) {
    try {
      const user = await userService.getUser(req.params.id);
      return res.status(StatusCodes.OK).json(user);
    } catch (err) {
      logger.warn(err.message);
      return sendErrorResponse(res, StatusCodes.NOT_FOUND, err.message);
    }
  }

  static async updateUser(req, res) {
    try {
      const id = authService.getDecodedToken(req.headers.authorization).userId;
      await userService.updateUser(req.body, id);
      return res.status(StatusCodes.OK).json();
    } catch (err) {
      logger.warn(err.message);
      return res.status(StatusCodes.BAD_GATEWAY).json();
    }
  }
};
