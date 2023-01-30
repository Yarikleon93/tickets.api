'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('MovieBanners', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      movieId: {
        type: Sequelize.STRING
      },
      bannerUrl: {
        type: Sequelize.STRING
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('MovieBanners');
  }
};