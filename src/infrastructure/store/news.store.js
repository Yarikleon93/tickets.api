const db = require("../../core/models/index").db;
const QueryBuilder = require("../query-builders/news.qb");
const dbLogger = require("../../utils/loggers/db.logger");
const dbOperation = require("../../core/enums/db-operations.enum");
const newsImagesStore = require("./news-images.store.js");

module.exports = class NewsStore {
  static async addNews(model) {
    try {
      const news = await db.News.create(model);
      dbLogger.info(news, dbOperation.CREATE);
      return news;
    } catch (err) {
      dbLogger.warn(err.message, dbOperation.CREATE);
      return null;
    }
  }

  static async getNews(id) {
    try {
      const news = await db.News.findOne({
        where: { id },
        include: [
          {
            model: db.NewsImages,
            as: "images",
            attributes: ["url"],
          },
        ],
      });
      dbLogger.info(news, dbOperation.SELECT);
      return news;
    } catch (err) {
      dbLogger.warn(err.message, dbOperation.SELECT);
      return null;
    }
  }

  static async getAllNews(config) {
    try {
      const queryBuilder = new QueryBuilder(db.News, db);
      const news = await queryBuilder
        .top(config.top)
        .offset(config.offset)
        .setStatus(config.status)
        .build();
      dbLogger.info(news, dbOperation.SELECT);
      return news;
    } catch (err) {
      dbLogger.warn(err.message, dbOperation.SELECT);
      return [];
    }
  }

  static async deleteNews(id) {
    try {
      await newsImagesStore.deleteImagesByNews(id);
      const news = await db.News.findByPk(id);
      dbLogger.info(news, dbOperation.REMOVE);
      await news.destroy();
      return news;
    } catch (err) {
      dbLogger.warn(err.message, dbOperation.REMOVE);
    }
  }

  static async updateNews(id, model) {
    try {
      const { title, subtitle, description } = model;
      await db.News.update(
        {
          title,
          subtitle,
          description,
        },
        { where: { id }, plain: true }
      );
      dbLogger.info(model, dbOperation.UPDATE);
    } catch (err) {
      dbLogger.warn(err.message, dbOperation.UPDATE);
    }
  }
};
