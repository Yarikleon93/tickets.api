'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('NewsImages', {
      id: {
        allowNull: false,
        type: Sequelize.STRING,
        primaryKey: true
      },
      newsId: {
        type: Sequelize.STRING,
      },
      url: {
        type: Sequelize.STRING
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('NewsImages');
  }
};