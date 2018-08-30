import express, { Express, Request, Response } from "express";
import tasks from "./tasks";

export default function constructorMethod(app: Express) {
  tasks.use("/api/tasks", tasks);

  app.use("*", (req: Request, res: Response) => {
    res.status(404).json({ error: "Route not found." });
  });
}
