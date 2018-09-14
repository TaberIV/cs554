import products from "./products";

export default app => {
  app.get("/", (req, res) => {
    res.render("home", {
      title: "My Products",
      items: products
    });
  });

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Route not found." });
  });
};
