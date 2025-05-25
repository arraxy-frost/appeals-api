import express from "express";
import cors from "cors";
import appealsRouter from "./routes/appealsRoutes";
import {errorHandler} from "./middlewares/errorHandler";

const app = express();

app.use(cors())
app.use(express.json());

app.use('/api/appeals', appealsRouter);

app.use(errorHandler);

export default app;
