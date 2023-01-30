'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Movies', {
      id: {
        primaryKey: true,
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      frameUrl: {
        type: Sequelize.STRING
      },
      previewUrl: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.INTEGER
      },
      duration: {
        type: Sequelize.INTEGER
      },
      startRental: {
        type: Sequelize.DATE
      },
      endRental: {
        type: Sequelize.DATE
      },
      posterUrl: {
        type: Sequelize.STRING
      },
      trailerUrl: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.DECIMAL
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Movies');
  }
};