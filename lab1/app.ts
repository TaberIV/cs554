import express, { Express } from "express";
// import bodyParser from "body-parser";
import configRoutes from "./routes";

const app: Express = express();
configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
