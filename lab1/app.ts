import bodyParser from "body-parser";
import express, { Express, Request, Response } from "express";
import configRoutes from "./routes";

const app: Express = express();
app.use(bodyParser.json());

app.use((req: Request, res: Response, next: () => void) => {
  console.log("Request body:");
  console.log(req.body);

  next();
});

const logs: { [key: string]: number } = {};

app.use((req: Request, res: Response, next: () => void) => {
  const { url } = req;

  if (!logs[url]) {
    logs[url] = 0;
  }

  logs[url] += 1;

  console.log(`Request url: ${url}\nAccess: ${logs[url]}`);

  next();
});

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
