import express from "express";
import appealsRouter from "./routes/appeals";

const app = express();

app.use(express.json());

app.use('/api/appeals', appealsRouter);

export default app;
