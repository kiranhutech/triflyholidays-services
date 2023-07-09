import { Sequelize, Model, DataTypes } from "sequelize";

const user: any = process.env.DATABASE_USER;
const host = process.env.HOST;
const database: any = process.env.DATABASE;
const password = process.env.PASSWORD;
const port: any = process.env.PORT;
console.log(database, user, password);

const sequelize = new Sequelize(database, user, password, {
  host,
  port,
  dialect: "postgres",
  logging: false,
  pool: { max: 3, evict: 30000, idle: 30000, acquire: 60000 },
});

export default sequelize;
