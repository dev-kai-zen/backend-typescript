"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "user_logs",
      {
        id: {
          type: Sequelize.BIGINT,
          autoIncrement: true,
          primaryKey: true,
        },
        user_id: {
          type: Sequelize.BIGINT,
          allowNull: true,
        },
        action: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        module: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        description: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        method: {
          type: Sequelize.STRING(10),
          allowNull: true,
        },
        route: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        status_code: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        ip_address: {
          type: Sequelize.STRING(45),
          allowNull: true,
        },
        user_agent: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        device_type: {
          type: Sequelize.STRING(50),
          allowNull: true,
        },
        browser: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        os: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        session_id: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        metadata: {
          type: Sequelize.JSON,
          allowNull: true,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
      },
      {
        charset: "utf8mb4",
        collate: "utf8mb4_unicode_ci",
      },
    );

    await queryInterface.addIndex("user_logs", {
      name: "idx_user_id",
      fields: ["user_id"],
    });
    await queryInterface.addIndex("user_logs", {
      name: "idx_action",
      fields: ["action"],
    });
    await queryInterface.addIndex("user_logs", {
      name: "idx_created_at",
      fields: ["created_at"],
    });
  },

  async down(queryInterface) {
    await queryInterface.removeIndex("user_logs", "idx_user_id");
    await queryInterface.removeIndex("user_logs", "idx_action");
    await queryInterface.removeIndex("user_logs", "idx_created_at");
    await queryInterface.dropTable("user_logs");
  },
};
