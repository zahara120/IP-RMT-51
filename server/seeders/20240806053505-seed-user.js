"use strict";

/** @type {import('sequelize-cli').Migration} */

const { hashPassword } = require("../helpers/bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          username: "admin",
          email: "admin@mail.com",
          password: hashPassword("limabiji"),
          role: "Admin",
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ],
      {}
    );
  },
  
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
