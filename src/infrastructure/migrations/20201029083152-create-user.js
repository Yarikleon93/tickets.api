'use strict';
const Role = require('../../enums/roles.enum');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        primaryKey: true,
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      fullName: {
        type: Sequelize.STRING
      },
      birthday: {
        type: Sequelize.DATE
      },
      password: {
        type: Sequelize.STRING
      },
      salt: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.INTEGER,
        defaultValue: Role.USER,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};