const { Op } = require("sequelize");
const db = require("../../core/models/index").db;
const QueryBuilder = require("../query-builders/movies.qb");
const dbLogger = require("../../utils/loggers/db.logger");
const dbOperation = require("../../core/enums/db-operations.enum");
const ImageManager = require('../../utils/image-manager');

module.exports = class MovieStore {
  static async getMovie(config) {
    let movie;
    const id = config.id;
    try {
      movie = await (!config.includeSessions
        ? db.Movies.findByPk(id)
        : db.Movies.findOne({
          where: { id },
          include: [
            {
              model: db.Sessions,
              as: "sessions",
              where: config.isActual
                ? {
                  date: { [Op.gt]: new Date().toUTCString() },
                }
                : null,
              required: false,
            },
          ],
          order: [[{ model: db.Sessions, as: "sessions" }, "date", "asc"]],
        }));
      dbLogger.info(movie, dbOperation.SELECT);
      return movie;
    } catch (err) {
      dbLogger.warn(err.message, dbOperation.SELECT);
    }
  }

  static async getMovies(config) {
    let movies;
    try {
      const qbConfig = {
        isIncludeSessions: config.includeSessions,
      };
      const queryBuilder = new QueryBuilder(db.Movies, db, qbConfig);
      movies = await queryBuilder
        .setStatus(config.status)
        .setActual(config.isActual)
        .setDate(config.date)
        .top(config.top)
        .offset(config.offset)
        .build();

      dbLogger.info(movies, dbOperation.SELECT);
      return movies;
    } catch (err) {
      dbLogger.warn(err.message, dbOperation.SELECT);
      return [];
    }
  }
  static async addMovie(data) {
    try {
      ImageManager.saveImg(data.posterImg, data.posterUrl);
      ImageManager.saveImg(data.frameImg, data.frameUrl);
      return await db.Movies.create(data);
    } catch (err) {
      dbLogger.warn(err.message, dbOperation.CREATE);
      return null;
    }
  }

  static async updateMovie(movie) {
    try {
      ImageManager.saveImg(movie.posterImg, movie.posterUrl);
      ImageManager.saveImg(movie.frameImg, movie.frameUrl);
      return db.Movies.update(movie, {
        where: { id: movie.id },
      });
    } catch (err) {
      dbLogger.warn(err.message, dbOperation.UPDATE);
      return null;
    }
  }

  static async deleteMovie(id) {
    try {
      return db.Movies.destroy({
        where: {
          id
        },
      });
    } catch (err) {
      dbLogger.warn(err.message, dbOperation.UPDATE);
      return null;
    }
  }

};
