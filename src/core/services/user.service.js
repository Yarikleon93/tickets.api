const _ = require("lodash");
const userStore = require("../../infrastructure/store/user.store");

module.exports = class UserService {
  static async getUser(id) {
    const user = await userStore.getUser(id);
    if (!user) throw new Error("User is not found");
    return _.omit(user, ["password", "salt"]);
  }
  static async updateUser(data, id) {
    return userStore.updateUser({ ...data, id });
  }
  static async getUserByEmail(email) {
    return userStore.getUserByEmail(email);
  }
};
