import people from "./people";

function configRoutes(app) {
  app.use("/api/people", people);

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Route not found." });
  });
}

export default configRoutes;
