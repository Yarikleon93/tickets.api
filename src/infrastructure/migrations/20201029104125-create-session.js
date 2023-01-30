'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Sessions', {
      id: {
        primaryKey: true,
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.DATE
      },
      movieId: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Sessions');
  }
};