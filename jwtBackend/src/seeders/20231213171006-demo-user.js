"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "User",
      [
        {
          email: "John Doe",
          password: "123",
          username: "John",
        },

        {
          email: "John Doe1",
          password: "123",
          username: "John",
        },

        {
          email: "John Doe2",
          password: "12321",
          username: "Johns",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
