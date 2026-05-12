"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn(
      "asa_operations",
      "name",
      "operation_name",
      {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn(
      "asa_operations",
      "operation_name",
      "name",
      {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
    );
  },
};
