"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  class accounts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  accounts.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      productId: DataTypes.UUID,
      createdBy: DataTypes.UUID,
      fullName: DataTypes.STRING,
      email: DataTypes.STRING,
      mobile: DataTypes.STRING,
      countryCode: DataTypes.STRING,
      customerId: DataTypes.STRING,
      password: DataTypes.STRING,
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      emailVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      phoneVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      accountType: DataTypes.STRING,
      lastLoggedIn: DataTypes.TIME,
      uttr: DataTypes.STRING,
      isArchived: DataTypes.TIME,
      isEarnedToday: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "accounts",
    }
  );

  accounts.beforeCreate(async (account, options) => {
    const total = await accounts.count();
    const yrmonth = generateUniqueCode();
    const extrazero =
      total < 100 ? "000" : total < 1000 ? "00" : total < 10000 ? "0" : "";
    account.customerId = `MYB${yrmonth}${extrazero}${total + 1}`;
    const hashedPassword = await bcrypt.hash(account.password, 10);
    account.password = hashedPassword;

    // Verify the password during authentication
    account.prototype.authenticate = async function (password) {
      return await bcrypt.compare(password, this.passwordHash);
    };
  });
  return accounts;
};

function generateUniqueCode() {
  const currentDate = new Date();
  const year = currentDate.getFullYear().toString().slice(-2);
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");

  const uniqueCode = month + year;
  return uniqueCode;
}
