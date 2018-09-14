import express from "express";
import handlebars from "express-handlebars";
import configRoutes from "./src/routes";

const app = express();

const _static = express.static(__dirname + "/public");
app.use("/public", _static);

app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

configRoutes(app);

app.listen(3000, () => {
  console.log("This absurd site is now running on http://localhost:3000");
});
