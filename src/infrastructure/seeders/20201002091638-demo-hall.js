"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert("Halls", [
      {
        id: "2",
        name: "Middle Hall",
        cols: 9,
        rows: 7,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete("Halls", null, {});
  },
};
