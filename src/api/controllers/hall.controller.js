const { StatusCodes } = require("http-status-codes");
const logger = require("../../utils/loggers/logger");
const hallService = require("../../core/services/hall.service");

module.exports = class HallsController {
  static async createHall(req, res) {
    try {
      const hall = await hallService.createHall(req.body);
      return res.status(StatusCodes.OK).json(hall);
    } catch (err) {
      logger.warn(err.message);
      return res.status(StatusCodes.BAD_GATEWAY).json({ message: err.message });
    }
  }

  static async getHallBySession(req, res) {
    try {
      const hall = await hallService.getHallBySession(req.params.sessionId);
      return res.status(StatusCodes.OK).json(hall);
    } catch (err) {
      logger.warn(err.message);
      return res.status(StatusCodes.BAD_GATEWAY).json({ message: err.message });
    }
  }

  static async getHalls(req, res) {
    try {
      const halls = await hallService.getHalls();
      return res.status(StatusCodes.OK).json(halls);
    } catch (err) {
      logger.warn(err.message);
      return res.status(StatusCodes.BAD_GATEWAY).json({ message: err.message });
    }
  }
};
