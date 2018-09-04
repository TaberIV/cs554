import bodyParser from "body-parser";
import express, { Express } from "express";
import configRoutes from "./routes";

const app: Express = express();
app.use(bodyParser.json());

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
