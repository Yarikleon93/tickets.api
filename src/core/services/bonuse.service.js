const _ = require('lodash');
const bonuseStore = require('../../infrastructure/store/bonuse.store');

module.exports = class BonuseService {
  static async getBonuses() {
    return bonuseStore.getBonuses();
  }
};
