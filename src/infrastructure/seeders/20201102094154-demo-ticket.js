'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('Tickets', [{
      id: '1',
      sessionId: '11',
      seatId: '1',
    }, {
      id: '2',
      sessionId: '11',
      seatId: '2',
    },
    {
      id: '3',
      sessionId: '11',
      seatId: '3',
    },
    {
      id: '4',
      sessionId: '11',
      seatId: '4',
    },
    {
      id: '5',
      sessionId: '11',
      seatId: '5',
    },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('Tickets', null, {});
  }
};