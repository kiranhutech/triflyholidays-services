"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("earnings", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.literal(
          "uuid_in((md5((random())::text))::cstring)"
        ),
      },
      customerId: {
        type: Sequelize.UUID,
      },
      totalCount: {
        type: Sequelize.DOUBLE,
      },
      totalLeftCount: {
        type: Sequelize.DOUBLE,
      },
      totalRightCount: {
        type: Sequelize.DOUBLE,
      },
      dayTotalCount: {
        type: Sequelize.DOUBLE,
      },
      dayLeftCount: {
        type: Sequelize.DOUBLE,
      },
      dayRightCount: {
        type: Sequelize.DOUBLE,
      },
      totalEarn: {
        type: Sequelize.DOUBLE,
      },
      totalLeftEarn: {
        type: Sequelize.DOUBLE,
      },
      totalRightEarn: {
        type: Sequelize.DOUBLE,
      },
      dayTotalEarn: {
        type: Sequelize.DOUBLE,
      },
      dayLeftEarn: {
        type: Sequelize.DOUBLE,
      },
      dayRightEarn: {
        type: Sequelize.DOUBLE,
      },
      earnedFrom: {
        type: Sequelize.JSONB,
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
    await queryInterface.dropTable("earnings");
  },
};
