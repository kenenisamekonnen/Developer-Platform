'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Users", "password", {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.addColumn("Users", "role", {
      type: Sequelize.ENUM("user", "admin"),
      allowNull: false,
      defaultValue: "user",
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn("Users", "password");
    await queryInterface.removeColumn("Users", "role");
  }
};

