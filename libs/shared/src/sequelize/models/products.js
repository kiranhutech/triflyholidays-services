"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  products.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      productName: DataTypes.STRING,
      productCode: DataTypes.STRING,
      isArchived: DataTypes.TIME,
    },
    {
      sequelize,
      modelName: "products",
    }
  );

  products.beforeCreate(async (product, options) => {
    const total = await products.count();
    const extrazero =
      total < 10 ? "000" : total < 100 ? "00" : total < 100 ? "0" : "";
    product.productCode = `PROD${extrazero}${total + 1}`;
  });
  return products;
};
