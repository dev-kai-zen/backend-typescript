"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.query(
      "ALTER TABLE `asa_divisions` CHANGE COLUMN `name` `division_name` VARCHAR(255) NOT NULL",
    );
  },

  async down(queryInterface) {
    await queryInterface.sequelize.query(
      "ALTER TABLE `asa_divisions` CHANGE COLUMN `division_name` `name` VARCHAR(255) NOT NULL",
    );
  },
};
