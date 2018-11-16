import { Db, MongoClient } from "mongodb";

const mongoConfig = {
  database: "McFarlin-Taber-CS554-Lab1",
  serverUrl: "mongodb://localhost:27017"
};

let connection: MongoClient;
let db: Db;

export default async () => {
  if (!connection) {
    connection = await MongoClient.connect(
      mongoConfig.serverUrl,
      { useNewUrlParser: true }
    );
    db = await connection.db(mongoConfig.database);
  }

  return db;
};
