"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class earnings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  earnings.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      customerId: DataTypes.UUID,
      totalCount: {
        type: DataTypes.DOUBLE,
        defaultValue: 0,
      },
      totalLeftCount: {
        type: DataTypes.DOUBLE,
        defaultValue: 0,
      },
      totalRightCount: {
        type: DataTypes.DOUBLE,
        defaultValue: 0,
      },
      dayTotalCount: {
        type: DataTypes.DOUBLE,
        defaultValue: 0,
      },
      dayLeftCount: {
        type: DataTypes.DOUBLE,
        defaultValue: 0,
      },
      dayRightCount: {
        type: DataTypes.DOUBLE,
        defaultValue: 0,
      },
      totalEarn: {
        type: DataTypes.DOUBLE,
        defaultValue: 0,
      },
      totalLeftEarn: {
        type: DataTypes.DOUBLE,
        defaultValue: 0,
      },
      totalRightEarn: {
        type: DataTypes.DOUBLE,
        defaultValue: 0,
      },
      dayTotalEarn: {
        type: DataTypes.DOUBLE,
        defaultValue: 0,
      },
      dayLeftEarn: {
        type: DataTypes.DOUBLE,
        defaultValue: 0,
      },
      dayRightEarn: {
        type: DataTypes.DOUBLE,
        defaultValue: 0,
      },
      earnedFrom: {
        type: DataTypes.JSONB,
        defaultValue: [],
      },
    },
    {
      sequelize,
      modelName: "earnings",
    }
  );
  return earnings;
};
