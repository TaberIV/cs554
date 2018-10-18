import express from "express";
import configRoutes from "./routes";

const app = express();

configRoutes(app);

app.listen(3000, () => {
  console.log("Routes listening on http://localhost:3000");
});
