const { StatusCodes } = require("http-status-codes");
const logger = require("../../utils/loggers/logger");
const visitingRulesService = require("../../core/services/visiting-rules.service");
const { sendErrorResponse } = require("../../utils/response");

module.exports = class VisitingRulesController {
  static async getText(req, res) {
    try {
      const text = await visitingRulesService.getText();
      return res.status(StatusCodes.OK).json(text);
    } catch (err) {
      logger.warn(err.message);
      return sendErrorResponse(res, StatusCodes.NOT_FOUND, err.message);
    }
  }

  static async updateText(req, res) {
    try {
      await visitingRulesService.updateText(req.body.data);
      return res.status(StatusCodes.OK).json();
    } catch (err) {
      logger.warn(err.message);
      return res.status(StatusCodes.BAD_GATEWAY).json();
    }
  }
};
