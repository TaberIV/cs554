export default app => {
  app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
  });

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Route not found." });
  });
};
