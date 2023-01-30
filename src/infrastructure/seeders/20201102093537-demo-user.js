'use strict';
const Role = require('../../core/enums/roles.enum');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('Users', [{
      id: '1',
      email: 'yar@gmail.com',
      fullName: 'Ярослав Л',
      birthday: new Date(),
      password: '123456',
      salt: '123g1k3hg',
      role: Role.ADMIN,
    }, {
      id: '2',
      email: 'bogd@gmail.com',
      fullName: 'Богдан Б',
      birthday:  new Date(),
      password: '123456',
      salt: 'ljk3h5j34',
      role: Role.USER,
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('Users', null, {});
  }
};