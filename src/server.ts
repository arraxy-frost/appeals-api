import app from "./app";
import {initDB} from "./config/sequelize";

const PORT = process.env.PORT || 8080;

initDB().then(() => {
    console.log("Database Connected");

    app.listen(PORT, () => {
        console.log(`Listening port ${PORT}`);
    });
});

