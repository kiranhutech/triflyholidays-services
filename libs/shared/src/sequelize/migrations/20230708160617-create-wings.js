"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("wings", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.literal(
          "uuid_in((md5((random())::text))::cstring)"
        ),
      },
      accountId: {
        type: Sequelize.UUID,
      },
      wingSide: {
        type: Sequelize.STRING,
      },
      leftWingId: {
        type: Sequelize.UUID,
      },
      rightWingId: {
        type: Sequelize.UUID,
      },
      rightWingCount: {
        type: Sequelize.DOUBLE,
      },
      leftWingCount: {
        type: Sequelize.DOUBLE,
      },
      isFreezedWing: {
        type: Sequelize.BOOLEAN,
      },
      isVerified: {
        type: Sequelize.BOOLEAN,
      },
      verifiedBy: {
        type: Sequelize.UUID,
      },
      verifiedAt: {
        type: Sequelize.TIME,
      },
      lifeTimeEarning: {
        type: Sequelize.DOUBLE,
      },
      dayEarning: {
        type: Sequelize.DOUBLE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("wings");
  },
};
