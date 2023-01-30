const db = require("../../core/models/index").db;
const dbLogger = require("../../utils/loggers/db.logger");
const dbOperation = require("../../core/enums/db-operations.enum");

module.exports = class SeatStore {
  static async createSeats(models) {
    try {
      const seats = await db.Seats.bulkCreate(models);
      dbLogger.info(seats, dbOperation.BULK_CREATE);
    } catch (err) {
      dbLogger.warn(err.message, dbOperation.BULK_CREATE);
    }
  }

  static async getSeat(id) {
    try {
      const seat = await db.Seats.findByPk(id);
      dbLogger.info(seat, dbOperation.SELECT);
      return seat;
    } catch (err) {
      dbLogger.warn(err.message, dbOperation.SELECT);
      return null;
    }
  }

  static async getSeatsByHall(hallId) {
    try {
      const seats = await db.Seats.findAll({
        where: { hallId },
        include: {
          model: db.Sectors,
          as: "sector",
          attributes: ["name"],
        },
        attributes: { exclude: ["sectorId", "hallId"] },
        raw: true,
        nest: true,
      });
      dbLogger.info(seats, dbOperation.SELECT);
      return seats;
    } catch (err) {
      dbLogger.warn(err.message, dbOperation.SELECT);
      return [];
    }
  }
};
