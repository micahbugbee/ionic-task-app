"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const sequelize_1 = require("sequelize");
const task_1 = require("./task");
const dbName = 'tasksDB';
const username = 'root';
const password = 'hotrod';
const sequelize = new sequelize_1.Sequelize(dbName, username, password, {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});
(0, task_1.TaskFactory)(sequelize);
exports.db = sequelize;
