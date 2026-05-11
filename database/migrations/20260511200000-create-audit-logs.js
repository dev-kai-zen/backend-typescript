"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "audit_logs",
      {
        id: {
          type: Sequelize.UUID,
          allowNull: false,
          primaryKey: true,
          defaultValue: Sequelize.literal("(UUID())"),
        },
        user_id: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: true,
          references: {
            model: "users",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
        },
        action: {
          type: Sequelize.STRING(64),
          allowNull: false,
        },
        entity_type: {
          type: Sequelize.STRING(128),
          allowNull: false,
        },
        entity_id: {
          type: Sequelize.STRING(64),
          allowNull: true,
        },
        old_values: {
          type: Sequelize.JSON,
          allowNull: true,
        },
        new_values: {
          type: Sequelize.JSON,
          allowNull: true,
        },
        change_fields: {
          type: Sequelize.JSON,
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
        timestamp: {
          type: Sequelize.DATE(3),
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE(3),
          allowNull: false,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP(3)"),
        },
        updated_at: {
          type: Sequelize.DATE(3),
          allowNull: false,
        },
      },
      {
        charset: "utf8mb4",
        collate: "utf8mb4_unicode_ci",
      },
    );

    await queryInterface.addIndex("audit_logs", ["user_id"], {
      name: "audit_logs_user_id_idx",
    });
    await queryInterface.addIndex("audit_logs", ["entity_type", "entity_id"], {
      name: "audit_logs_entity_idx",
    });
    await queryInterface.addIndex("audit_logs", ["timestamp"], {
      name: "audit_logs_timestamp_idx",
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("audit_logs");
  },
};
