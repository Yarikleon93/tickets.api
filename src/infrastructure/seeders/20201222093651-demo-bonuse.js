'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('Bonuses', [{
      id: 'd93a8d5c-34ef-469d-be89-9b15b85d5809',
      name: 'напиток',
      image: 'drink.svg',
      total: 300,
    }, {
      id: '369a6a19-ced3-4432-915d-6cd8de7b945c',
      name: 'попкорн',
      image: 'popcorn.svg',
      total: 1000,
    }, {
      id: '732de41e-1045-4f79-91a5-389438fb702e',
      name: 'напиток и попкорн',
      image: 'popcorn&drink.svg',
      total: 1300,
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('Bonuses', null, {});
  }
};