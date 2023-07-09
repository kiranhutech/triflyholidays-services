"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("accounts", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.literal(
          "uuid_in((md5((random())::text))::cstring)"
        ),
      },
      productId: {
        type: Sequelize.UUID,
      },
      createdBy: {
        type: Sequelize.UUID,
      },
      fullName: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      mobile: {
        type: Sequelize.STRING,
      },
      countryCode: {
        type: Sequelize.STRING,
      },
      customerId: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
      },
      emailVerified: {
        type: Sequelize.BOOLEAN,
      },
      phoneVerified: {
        type: Sequelize.BOOLEAN,
      },
      accountType: {
        type: Sequelize.STRING,
      },
      lastLoggedIn: {
        type: Sequelize.TIME,
      },
      uttr: {
        type: Sequelize.STRING,
      },
      isArchived: {
        type: Sequelize.TIME,
      },
      isEarnedToday: {
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable("accounts");
  },
};
