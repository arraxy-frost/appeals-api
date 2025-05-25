import dotenv from 'dotenv';
import { Sequelize } from "sequelize-typescript";

dotenv.config();

const sequelize: Sequelize = new Sequelize(
    process.env.DB_NAME!,
    process.env.DB_USER!,
    process.env.DB_PASS!,
    {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT ?? '3306'),
        dialect: 'mysql',
        models: [__dirname + '/../models'],
        logging: process.env.NODE_ENV === 'development' ? console.log : false,
        define: {
            timestamps: true,
        },
    }
)

async function initDB() {
    try {
        await sequelize.authenticate();
        console.log('Connection to DB has been established successfully.');

        if (process.env.NODE_ENV === 'development') {
            await sequelize.sync({ alter: true });
            console.log('Database synchronized with models.');
        }

        return sequelize;
    }
    catch (err) {
        console.error('Unable to connect to the database:', err);
        process.exit(1);
    }
}

export { sequelize, initDB };