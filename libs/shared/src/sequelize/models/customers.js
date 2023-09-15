"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class customers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  customers.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      productId: DataTypes.UUID,
      customerId: DataTypes.STRING,
      password: DataTypes.STRING,
      currentAchievement: DataTypes.STRING,
      upcomingAchievement: DataTypes.STRING,
      parentId: DataTypes.UUID,
      leftChildId: DataTypes.UUID,
      rightChildId: DataTypes.UUID,
      verificationStatus: DataTypes.STRING,
      verifiedBy: DataTypes.UUID,
      verifiedOn: DataTypes.DATE,
      accountStatus: DataTypes.STRING,
      effectiveParents: DataTypes.JSONB,
      lastOTP: DataTypes.STRING,
      optExiresOn: DataTypes.DATE,
      isArchived: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "customers",
    }
  );

  customers.beforeCreate(async (account, options) => {
    const total = await customers.count();
    const yrmonth = generateUniqueCode();
    const extrazero =
      total < 100 ? "000" : total < 1000 ? "00" : total < 10000 ? "0" : "";
    account.customerId = `MYB${yrmonth}${extrazero}${total + 1}`;
    const hashedPassword = await bcrypt.hash(account.password, 10);
    account.password = hashedPassword;
  });
  return customers;
};

function generateUniqueCode() {
  const currentDate = new Date();
  const year = currentDate.getFullYear().toString().slice(-2);
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");

  const uniqueCode = month + year;
  return uniqueCode;
}
