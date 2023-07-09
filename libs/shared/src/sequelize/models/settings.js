"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class settings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  settings.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      achievements: DataTypes.JSONB,
      wingThreshold: DataTypes.DOUBLE,
    },
    {
      sequelize,
      modelName: "settings",
    }
  );
  return settings;
};
