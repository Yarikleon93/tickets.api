const db = require("../../core/models/index").db;
const dbLogger = require("../../utils/loggers/db.logger");
const dbOperation = require("../../core/enums/db-operations.enum");

module.exports = class HallStore {
  static async createHall(model) {
    try {
      const hall = await db.Halls.create(model);
      dbLogger.info(hall, dbOperation.CREATE);
      return hall;
    } catch (err) {
      dbLogger.warn(err.message, dbOperation.SELECT);
      return null;
    }
  }

  static async getHallBySession(sessionId) {
    try {
      const session = await db.Sessions.findOne({
        where: { id: sessionId },
        attributes: [],
        include: {
          model: db.Halls,
          as: "Hall",
          attributes: ["id", "name", "cols", "rows"],
          required: true,
        },
        raw: true,
        nest: true,
      });
      const hall = session.Hall;
      dbLogger.info(hall, dbOperation.SELECT);
      return hall;
    } catch (err) {
      dbLogger.warn(err.message, dbOperation.SELECT);
      return null;
    }
  }

  static async getHalls() {
    try {
      const halls = await db.Halls.findAll({ raw: true });
      dbLogger.info(halls, dbOperation.SELECT);
      return halls;
    } catch (err) {
      dbLogger.warn(err.message, dbOperation.SELECT);
      return null;
    }
  }
};
