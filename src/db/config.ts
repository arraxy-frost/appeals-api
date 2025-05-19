import {Dialect} from "sequelize";

interface DbConfig {
    username?: string,
    password?: string,
    database?: string,
    host?: string,
    dialect: Dialect
}

const dbConfig: DbConfig = {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql'
}

export default dbConfig;