"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class bankdetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  bankdetails.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      customerId: DataTypes.UUID,
      name: DataTypes.STRING,
      panNum: DataTypes.STRING,
      accNum: DataTypes.STRING,
      ifsc: DataTypes.STRING,
      branch: DataTypes.STRING,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      kycVerificationStatus: DataTypes.STRING,
      verifiedBy: DataTypes.UUID,
      verifiedOn: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "bankdetails",
    }
  );
  return bankdetails;
};
