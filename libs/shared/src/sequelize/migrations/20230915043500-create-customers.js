"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("customers", {
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
      customerId: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      wingSide: {
        type: Sequelize.STRING,
      },
      currentAchievement: {
        type: Sequelize.STRING,
      },
      upcomingAchievement: {
        type: Sequelize.STRING,
      },
      parentId: {
        type: Sequelize.UUID,
      },
      leftChildId: {
        type: Sequelize.UUID,
      },
      rightChildId: {
        type: Sequelize.UUID,
      },
      verificationStatus: {
        type: Sequelize.STRING,
      },
      verifiedBy: {
        type: Sequelize.UUID,
      },
      verifiedOn: {
        type: Sequelize.DATE,
      },
      accountType: {
        type: Sequelize.STRING,
      },
      accountStatus: {
        type: Sequelize.STRING,
      },
      effectiveParents: {
        type: Sequelize.JSONB,
        defaultValue: [],
      },
      lastOTP: {
        type: Sequelize.STRING,
      },
      optExiresOn: {
        type: Sequelize.DATE,
      },
      isArchived: {
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
    await queryInterface.dropTable("customers");
  },
};
