import express, { Express } from "express";

export default function constructorMethod(app: Express) {
  app.use("*", (req: express.Request, res: express.Response) => {
    res.status(404).json({ error: "Route not found." });
  });
}
