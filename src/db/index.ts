import { Sequelize } from "sequelize-typescript";
import dbConfig from "./config";

const sequelize = new Sequelize({
    ...dbConfig,
    models: [],
    logging: console.log,
});

export default sequelize;