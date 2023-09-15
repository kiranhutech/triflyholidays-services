"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("settlements", {
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
      settlementPeriod: {
        type: Sequelize.DATE,
      },
      amountSettled: {
        type: Sequelize.DOUBLE,
      },
      wingsAdded: {
        type: Sequelize.JSONB,
      },
      totalAddedWings: {
        type: Sequelize.DOUBLE,
      },
      totalAddedLeftWings: {
        type: Sequelize.DOUBLE,
      },
      totalAddedRightWings: {
        type: Sequelize.DOUBLE,
      },
      systemStatus: {
        type: Sequelize.STRING,
      },
      bankStatus: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("settlements");
  },
};
