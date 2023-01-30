'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('MovieBanners', [
      {
        id: '1',
        movieId: '527d7adf-0e97-4236-b5b1-9e3964e549a2',
        bannerUrl: '1920-1080.jpg'
      },
      {
        id: '2',
        movieId: 'ace5d440-57ed-486b-a2e4-5942edca1302',
        bannerUrl: 'dyvo-ads.jpg'
      },
      {
        id: '3',
        movieId: '8520002e-f520-40d2-a428-0bd078dc779d',
        bannerUrl: 'mulan-ads.png'
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('MovieBanners', null, {});
  }
};
