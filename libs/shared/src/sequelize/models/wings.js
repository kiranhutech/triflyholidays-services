"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class wings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  wings.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      accountId: DataTypes.UUID,
      wingSide: DataTypes.STRING,
      leftWingId: DataTypes.UUID,
      rightWingId: DataTypes.UUID,
      rightWingCount: DataTypes.DOUBLE,
      leftWingCount: DataTypes.DOUBLE,
      isFreezedWing: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      verifiedBy: DataTypes.UUID,
      verifiedAt: DataTypes.TIME,
      lifeTimeEarning: DataTypes.DOUBLE,
      dayEarning: DataTypes.DOUBLE,
    },
    {
      sequelize,
      modelName: "wings",
    }
  );
  return wings;
};
