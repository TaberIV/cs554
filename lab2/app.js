import express from "express";
import configRoutes from "./routes";

const app = express();

configRoutes(app);

app.listen(3000, () => {
  console.log("This absurd site is now running on http://localhost:3000");
});
