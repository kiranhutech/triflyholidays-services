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
      totalCount: DataTypes.DOUBLE,
      totalLeftCount: DataTypes.DOUBLE,
      totalRightCount: DataTypes.DOUBLE,
      dayTotalCount: DataTypes.DOUBLE,
      dayLeftCount: DataTypes.DOUBLE,
      dayRightCount: DataTypes.DOUBLE,
      totalEarn: DataTypes.DOUBLE,
      totalLeftEarn: DataTypes.DOUBLE,
      totalRightEarn: DataTypes.DOUBLE,
      dayTotalEarn: DataTypes.DOUBLE,
      dayLeftEarn: DataTypes.DOUBLE,
      dayRightEarn: DataTypes.DOUBLE,
      earnedFrom: DataTypes.JSONB,
    },
    {
      sequelize,
      modelName: "earnings",
    }
  );
  return earnings;
};
