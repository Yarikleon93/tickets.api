const { StatusCodes } = require("http-status-codes");
const bonuseService = require("../../core/services/bonuse.service");

module.exports = class BonusesController {
  static async getUserBonuses(req, res) {
    const bonuses = await bonuseService.getBonuses();
    return res.status(StatusCodes.OK).json(bonuses);
  }
};
