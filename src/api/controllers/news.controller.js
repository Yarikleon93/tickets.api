const { StatusCodes } = require("http-status-codes");
const logger = require("../../utils/loggers/logger");
const newsService = require("../../core/services/news.service");
const { sendErrorResponse } = require("../../utils/response");

module.exports = class NewsController {
  static async addNews(req, res) {
    try {
      const news = await newsService.addNews(req.body);
      return res.status(StatusCodes.OK).json(news);
    } catch (err) {
      logger.warn(err.message);
      return sendErrorResponse(res, StatusCodes.BAD_GATEWAY);
    }
  }

  static async deleteNews(req, res) {
    try {
      await newsService.deleteNews(req.params.id);
      return res.status(StatusCodes.OK).json();
    } catch (err) {
      logger.warn(err.message);
      return sendErrorResponse(res, StatusCodes.NOT_FOUND);
    }
  }

  static async getAllNews(req, res) {
    try {
      const news = await newsService.getAllNews(req.query);
      res.status(StatusCodes.OK).json(news);
    } catch (e) {
      logger.warn(err.message);
      return sendErrorResponse(res, StatusCodes.NOT_FOUND);
    }
  }

  static async getNews(req, res) {
    try {
      const news = await newsService.getNews(req.params.id);
      res.status(StatusCodes.OK).json(news);
    } catch (e) {
      logger.warn(err.message);
      return sendErrorResponse(res, StatusCodes.NOT_FOUND);
    }
  }

  static async updateNews(req, res) {
    try {
      await newsService.updateNews(req.params.id, req.body);
      res.status(StatusCodes.OK).json();
    } catch (err) {
      logger.warn(err.message);
      return sendErrorResponse(res, StatusCodes.NOT_FOUND);
    }
  }
};
