"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  products.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      productCode: DataTypes.STRING,
      productName: DataTypes.STRING,
      pointsPerChild: DataTypes.DOUBLE,
      isActive: DataTypes.BOOLEAN,
      isArchived: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "products",
    }
  );
  return products;
};
