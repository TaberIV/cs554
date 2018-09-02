import { Collection } from "mongodb";
import { Task } from "../Types";
import dbConnection from "./mongoConnection";

function getCollectionFn<T>(collection): () => Promise<Collection<T>> {
  let col: Collection<T> | undefined;

  return async () => {
    if (!col) {
      const db = await dbConnection();
      col = await db.collection<T>(collection);
    }

    return col;
  };
}

const tasks = getCollectionFn<Task>("tasks");

export { tasks };
