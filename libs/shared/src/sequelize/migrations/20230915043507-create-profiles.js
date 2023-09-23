"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("profiles", {
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
      firstName: {
        type: Sequelize.STRING,
      },
      middleName: {
        type: Sequelize.STRING,
      },
      lastName: {
        type: Sequelize.STRING,
      },
      dob: {
        type: Sequelize.DATE,
      },
      mobile: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },
      pan: {
        type: Sequelize.STRING,
      },
      aadhar: {
        type: Sequelize.STRING,
      },
      nomineeName: {
        type: Sequelize.STRING,
      },
      nomineeAge: {
        type: Sequelize.DOUBLE,
      },
      relationshipWithNominee: {
        type: Sequelize.STRING,
      },
      sponsorId: {
        type: Sequelize.STRING,
      },
      applineId: {
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
    await queryInterface.dropTable("profiles");
  },
};
