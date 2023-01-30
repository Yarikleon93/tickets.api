'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('NewsImages', [
      {
        id: '1',
        url: 'news1.jpg',
        newsId: '1'
      },
      {
        id: '2',
        url: 'news4.jpg',
        newsId: '1'
      },
      {
        id: '3',
        url: 'news5.jpg',
        newsId: '1'
      },
      {
        id: '4',
        url: 'news2.jpg',
        newsId: '2'
      },
      {
        id: '5',
        url: 'news3.jpg',
        newsId: '3'
      },
      {
        id: '6',
        url: 'news5.jpg',
        newsId: '4'
      }
    ]);
  }, 

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('NewsImages', null, {});
  }
};
