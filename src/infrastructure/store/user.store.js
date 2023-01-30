const db = require("../../core/models/index").db;
const dbLogger = require('../../utils/loggers/db.logger');
const dbOperation = require("../../core/enums/db-operations.enum");

module.exports = class UserStore {
  static async getUserByEmail(email) {
    try {
      const res = db.Users.findOne({
        where: {
          email,
        },
        raw: true,
      });
      return res;
    } catch (err) {
      dbLogger.warn(err.message, dbOperation.SELECT);
      return null;
    }
  }

  static async getUser(id) {
    try {
      const user = await db.Users.findByPk(id);
      return user.get({ plain: true });
    } catch (err) {
      dbLogger.warn(err.message, dbOperation.SELECT);
      return null;
    }
  }

  static async createUser(data) {
    try {
      const user = await db.Users.create(data);
      return user.get({ plain: true });
    } catch (err) {
      dbLogger.warn(err.message, dbOperation.CREATE);
      return null;
    }
  }

  static async updateUser(user) {
    try {
      return db.Users.update(user, {
        where: { id: user.id },
      });
    } catch (err) {
      dbLogger.warn(err.message, dbOperation.UPDATE);
      return null;
    }
  }
};
