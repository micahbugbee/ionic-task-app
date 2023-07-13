import { Sequelize } from "sequelize";
import { TaskFactory } from "./task";


const dbName = 'tasksDB';
const username = 'root';
const password = 'hotrod';

const sequelize = new Sequelize(dbName, username, password, {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});

TaskFactory(sequelize);

export const db = sequelize;