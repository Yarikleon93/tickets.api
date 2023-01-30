'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Seats', {
      id: {
        primaryKey: true,
        type: Sequelize.STRING
      },
      rowPosition: {
        type: Sequelize.INTEGER
      },
      colPosition: {
        type: Sequelize.INTEGER
      },
      place: {
        type: Sequelize.INTEGER
      },
      hallId: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.DECIMAL
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Seats');
  }
};