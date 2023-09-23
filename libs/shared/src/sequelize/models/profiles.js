"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class profiles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  profiles.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      customerId: DataTypes.UUID,
      firstName: DataTypes.STRING,
      middleName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      dob: DataTypes.DATE,
      mobile: DataTypes.STRING,
      email: DataTypes.STRING,
      address: DataTypes.STRING,
      pan: DataTypes.STRING,
      aadhar: DataTypes.STRING,
      nomineeName: DataTypes.STRING,
      nomineeAge: DataTypes.DOUBLE,
      relationshipWithNominee: DataTypes.STRING,
      sponsorId: DataTypes.STRING,
      applineId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "profiles",
    }
  );
  return profiles;
};
