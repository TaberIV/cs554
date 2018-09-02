import { v4 } from "uuid/interfaces";
import uuid from "uuid/v4";
import { tasks } from "../config/mongoCollections";
import { Task } from "../Types";

export async function getAllTasks() {
  const taskCollection = await tasks();

  return taskCollection.find({}).toArray();
}

export async function getTaskById(id: v4) {
  const taskCollection = await tasks();

  return taskCollection.findOne({ id });
}
