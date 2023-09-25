"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class settlements extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      settlements.belongsTo(models.customers, {
        as: "customer",
        foreignKey: "customerId",
      });
    }
  }
  settlements.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      customerId: DataTypes.UUID,
      settlementPeriod: DataTypes.DATE,
      amountSettled: DataTypes.DOUBLE,
      wingsAdded: DataTypes.JSONB,
      totalAddedWings: DataTypes.DOUBLE,
      totalAddedLeftWings: DataTypes.DOUBLE,
      totalAddedRightWings: DataTypes.DOUBLE,
      systemStatus: DataTypes.STRING,
      bankStatus: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "settlements",
    }
  );
  return settlements;
};
