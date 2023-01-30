const db = require("../../core/models/index").db;
const dbLogger = require('../../utils/loggers/db.logger');

module.exports = class BonuseStore {
static async getBonuses() {
    try {
      return await db.Bonuses.findAll({
          order: [
              ['total', 'asc']
            ]
        });
    } catch (err) {
      dbLogger.warn(err.message, dbOperation.SELECT);
      return [];
    }
  }
};