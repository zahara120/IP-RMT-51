"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let data = require("../data/recipe.json").map((item) => {
      return {
        ...item,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });
    await queryInterface.bulkInsert("Recipes", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Recipes", null, {});
  },
};
