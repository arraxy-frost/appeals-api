import express, { Express, Request, Response } from "express";

const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  res.json({
      status: 'Server is up!'
  });
});

export default app;
