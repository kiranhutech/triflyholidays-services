"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const user = process.env.DATABASE_USER;
const host = process.env.HOST;
const database = process.env.DATABASE;
const password = process.env.PASSWORD;
const port = process.env.PORT;
console.log(database, user, password);
const sequelize = new sequelize_1.Sequelize(database, user, password, {
    host,
    port,
    dialect: "postgres",
    logging: false,
    pool: { max: 3, evict: 30000, idle: 30000, acquire: 60000 },
});
exports.default = sequelize;
