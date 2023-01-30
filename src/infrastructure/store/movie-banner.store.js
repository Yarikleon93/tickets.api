const db = require("../../core/models/index").db;
const dbLogger = require('../../utils/loggers/db.logger');
const dbOperation = require('../../core/enums/db-operations.enum');

module.exports = class MovieBannerStore {
  static async getMovies() {
    try {
      const movieBanner = await db.MovieBanners.findAll({
        include: [
          {
            model: db.Movies,
            as: "movie",
          },
        ],
        attributes: ['id', 'bannerUrl']
      });
      dbLogger.info(movieBanner, dbOperation.SELECT);
      return movieBanner;
    } catch (err) {
      dbLogger.warn(err.message, dbOperation.SELECT);
      return null;
    }
  }
};
