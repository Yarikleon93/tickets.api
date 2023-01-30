'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('Sessions', [
      {
        id: '1',
        date: new Date(2021, 12, 17, 15, 30, 0),
        movieId: '144f2b66-33a2-4ab6-ad72-dea282db556a',
        price: '100',
        hallId: '2',
      }, {
        id: '2',
        date: new Date(2021, 3, 17, 15, 30, 0),
        movieId: '218a0505-e68e-4b03-87d3-7380c3f0fcda',
        price: '150',
        hallId: '2',
      }, {
        id: '3',
        date: new Date(2021, 12, 17, 8, 30, 0),
        movieId: '8520002e-f520-40d2-a428-0bd078dc779d',
        price: '150',
        hallId: '2',
      }, {
        id: '4',
        date: new Date(2020, 12, 29, 12, 0, 0),
        movieId: '37b57f25-186d-4412-b9ce-e41f68901e12',
        price: '150',
        hallId: '2',
      }, {
        id: '5',
        date: new Date(2021, 11, 17, 15, 30, 0),
        movieId: 'e99f7207-c9f4-4178-b681-def16cf04c52',
        price: '150',
        hallId: '2',
      }, {
        id: '6',
        date: new Date(2021, 12, 18, 15, 30, 0),
        movieId: '74a87c2e-2ba3-484e-b13b-e1018e8f11ef',
        price: '150',
        hallId: '2',
      },
      {
        id: '7',
        date: new Date(2020, 12, 17, 15, 30, 0),
        movieId: '07a71eac-7abe-4d5d-a31d-f342183f26ed',
        price: '100',
        hallId: '2',
      }, {
        id: '8',
        date: (() => { const date = new Date(); date.setDate(date.getDate() + 1); return date; })(),
        movieId: '527d7adf-0e97-4236-b5b1-9e3964e549a2',
        price: '150',
        hallId: '2',
      }, {
        id: '10',
        date: (() => { const date = new Date(); date.setDate(date.getDate() + 2); return date; })(),
        movieId: 'b21b7403-e6b2-4be1-918b-5a638935ba55',
        price: '150',
        hallId: '2',
      }, {
        id: '11',
        date: (() => { const date = new Date(); date.setDate(date.getDate() + 4); return date; })(),
        movieId: '527d7adf-0e97-4236-b5b1-9e3964e549a2',
        price: '150',
        hallId: '2',
      }, {
        id: '12',
        date: (() => { const date = new Date(); date.setDate(date.getDate() + 7); return date; })(),
        movieId: '527d7adf-0e97-4236-b5b1-9e3964e549a2',
        price: '150',
        hallId: '2',
      },
      {
        id: '13',
        date: new Date(2020, 2, 17, 15, 30, 0),
        movieId: 'a901ab28-8e89-4294-b350-0fb20c945432',
        price: '150',
        hallId: '2',
      }]);
  },
  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('Sessions', null, {});
  }
};
