"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert("News", [
      {
        id: "1",
        title: "Новій графік роботи кінотеатрів",
        subtitle: "З 28 серпня ми будемо працювати за новим графиком ",
        description: `All users on MySpace will know that there are millions of people out there. Every day besides so many people joining this community, there are many others who will be looking out for friends. This will mean that they are naturally looking out for good people who are interesting enough. For this, the profile has to be very interesting.

      To make the profile unique, you can use good MySpace layouts. This will make a world of a difference to the profile. Imagine that someone visits your profile, and they find it without any good information or pictures. They would not spend another minute looking at it, and you will quickly lose your reputation.
      
      You will also lose the chance to make a whole new bunch of friends. You cannot expect them to take a second look at your profile. Thus before you lose the chance to make new friends, you should customize the profile as best as you can. You can choose from a great variety, as there are plenty of sites, which are dedicated to MySpace layouts.
      
      You can even make the profile theme based, depending on what you have in mind. For example you could be a fan of a popular actor, and you could use his image for your profile. It is definitely more exciting than looking at some boring default settings on the profile. By having good MySpace layouts on the profile, you will get a lot of curious visitors.
      
      The number of friends and acquaintances will grow in a large number. This is what you should be looking for on this community. Thus it is not worth if you compromise on the profile. It is a very good idea to make the profile based on your interests. Thus you can very creatively talk about yourself without words.
      
      This would even be more appealing, as there would be a variety of images as well as colors. This will be a great pleasure for all the members who are visiting your profile, as you really will be giving them a chance to experience something new. Word might also spread about your unique profile, and thus the list of friends will keep growing.
      `,
        isBreaking: true,
      },
      {
        id: "2",
        title: "Новій графік роботи кінотеатрів",
        subtitle: "З 28 серпня ми будемо працювати за новим графиком ",
        description:
          "З 28 серпня ми будемо працювати за новим графиком  З 28 серпня ми будемо працювати за новим графиком  З 28 серпня ми будемо працювати за новим графиком  З 28 серпня ми будемо працювати за новим графиком ",
        isBreaking: true,
      },
      {
        id: "3",
        title: "Новій графік роботи кінотеатрів",
        subtitle: "З 28 серпня ми будемо працювати за новим графиком ",
        description:
          "З 28 серпня ми будемо працювати за новим графиком  З 28 серпня ми будемо працювати за новим графиком  З 28 серпня ми будемо працювати за новим графиком  З 28 серпня ми будемо працювати за новим графиком ",
        isBreaking: true,
      },
      {
        id: "4",
        title: "Новій графік роботи кінотеатрів",
        subtitle: "З 28 серпня ми будемо працювати за новим графиком ",
        description:
          "З 28 серпня ми будемо працювати за новим графиком  З 28 серпня ми будемо працювати за новим графиком  З 28 серпня ми будемо працювати за новим графиком  З 28 серпня ми будемо працювати за новим графиком ",
        isBreaking: false,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete("News", null, {});
  },
};
