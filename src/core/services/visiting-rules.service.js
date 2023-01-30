const fs = require("fs");

const path = "src/public/rules.txt";

module.exports = class visitingRulesService {
  static async getText() {
    return fs.readFileSync(path, "utf8");
  }

  static async updateText(data) {
    fs.writeFileSync(path, data);
  }
};
