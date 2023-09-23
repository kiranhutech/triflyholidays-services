"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  class customers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define the self-referential relationship
      customers.hasMany(models.customers, {
        as: "children", // alias for the relationship
        foreignKey: "parentId", // foreign key in the Customer table
      });

      // Optional: Define the inverse relationship for convenience
      customers.belongsTo(models.customers, {
        as: "parent", // alias for the relationship
        foreignKey: "parentId", // foreign key in the Customer table
      });

      customers.hasOne(models.profiles, {
        as: "profile",
        foreignKey: "customerId",
      });

      customers.hasOne(models.earnings, {
        as: "earnings",
        foreignKey: "customerId",
      });

      customers.hasMany(models.settlements, {
        as: "settlements",
        foreignKey: "customerId",
      });
    }
  }
  customers.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      productId: DataTypes.UUID,
      customerId: DataTypes.STRING,
      password: DataTypes.STRING,
      wingSide: DataTypes.STRING,
      currentAchievement: DataTypes.STRING,
      upcomingAchievement: DataTypes.STRING,
      parentId: DataTypes.UUID,
      leftChildId: DataTypes.UUID,
      rightChildId: DataTypes.UUID,
      verificationStatus: DataTypes.STRING,
      verifiedBy: DataTypes.UUID,
      verifiedOn: DataTypes.DATE,
      accountType: DataTypes.STRING,
      accountStatus: DataTypes.STRING,
      effectiveParents: {
        type: DataTypes.JSONB,
        defaultValue: [],
      },
      lastOTP: DataTypes.STRING,
      optExiresOn: DataTypes.DATE,
      isArchived: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "customers",
    }
  );

  customers.beforeCreate(async (customer, options) => {
    const total = await customers.count();
    const yrmonth = generateUniqueCode();
    const extrazero =
      total < 100 ? "000" : total < 1000 ? "00" : total < 10000 ? "0" : "";
    customer.customerId = `MYB${yrmonth}${extrazero}${total + 1}`;
    const hashedPassword = await bcrypt.hash(customer.password, 10);
    customer.password = hashedPassword;
  });
  return customers;
};

function generateUniqueCode() {
  const currentDate = new Date();
  const year = currentDate.getFullYear().toString().slice(-2);
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");

  const uniqueCode = month + year;
  return uniqueCode;
}
