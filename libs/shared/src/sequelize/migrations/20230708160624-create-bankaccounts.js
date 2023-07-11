"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("bankaccounts", {
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
      accNo: {
        type: Sequelize.STRING,
      },
      ifsc: {
        type: Sequelize.STRING,
      },
      micr: {
        type: Sequelize.STRING,
      },
      accountHolderName: {
        type: Sequelize.STRING,
      },
      branch: {
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
    await queryInterface.dropTable("bankaccounts");
  },
};
