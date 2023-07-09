"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class bankaccounts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  bankaccounts.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      accNo: DataTypes.STRING,
      ifsc: DataTypes.STRING,
      micr: DataTypes.STRING,
      accountHolderName: DataTypes.STRING,
      branch: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "bankaccounts",
    }
  );
  return bankaccounts;
};
