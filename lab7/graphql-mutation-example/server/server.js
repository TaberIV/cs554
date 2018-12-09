const express = require("express"),
  graphqlHTTP = require("express-graphql"),
  schema = require("./src/schema.js");

const app = express();

app.use("/graphql", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`GraphQL API server running at localhost:${PORT}`);
