"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("bankdetails", {
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
      name: {
        type: Sequelize.STRING,
      },
      panNum: {
        type: Sequelize.STRING,
      },
      accNum: {
        type: Sequelize.STRING,
      },
      ifsc: {
        type: Sequelize.STRING,
      },
      branch: {
        type: Sequelize.STRING,
      },
      city: {
        type: Sequelize.STRING,
      },
      state: {
        type: Sequelize.STRING,
      },
      kycVerificationStatus: {
        type: Sequelize.STRING,
        defaultValue: "PENDING",
      },
      verifiedBy: {
        type: Sequelize.UUID,
      },
      verifiedOn: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable("bankdetails");
  },
};
