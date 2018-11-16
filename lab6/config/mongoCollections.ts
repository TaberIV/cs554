import { Collection } from "mongodb";
import dbConnection from "./mongoConnection";

export interface ITask {
  _id: string;
  title: string;
  description: string;
  hoursEstimated: number;
  completed: boolean;
  comments: IComment[];
}

export interface IComment {
  _id: string;
  name: string;
  comment: string;
}

function getCollectionFn<T>(collection: string): () => Promise<Collection<T>> {
  let col: Collection<T> | undefined;

  return async () => {
    if (!col) {
      const db = await dbConnection();
      col = await db.collection<T>(collection);
    }

    return col;
  };
}

const tasks = getCollectionFn<ITask>("tasks");

export { tasks };
