import uuid from "uuid/v4";
import { tasks } from "../config/mongoCollections";
import { Comment, Task } from "../Types";

const noSuchMember = new Error("No such member exist in the database.");
const missingDetails = new Error("Missing details.");

export default {
  async getTasks(skip?: number, take?: number): Promise<Task[]> {
    skip = !skip ? 0 : skip;
    take = !take ? 20 : Math.min(take, 100);

    try {
      const taskCollection = await tasks();

      return taskCollection
        .find()
        .limit(skip + take)
        .toArray()
        .then(taskArr => taskArr.slice(skip));
    } catch (e) {
      throw e;
    }
  },

  async getTaskById(_id: string) {
    const taskCollection = await tasks();

    return taskCollection.findOne({ _id });
  },

  async createTask(task: {
    title: string;
    description: string;
    hoursEstimated: number;
    completed?: boolean;
  }) {
    try {
      const taskCollection = await tasks();

      const { title, description, hoursEstimated, completed } = task;

      if (!title || !description || !(hoursEstimated > 0)) {
        throw missingDetails;
      }

      const newTask: Task = {
        _id: uuid(),
        title,
        description,
        hoursEstimated,
        completed: completed === true,
        comments: [] as Comment[]
      };

      await taskCollection.insertOne(newTask);

      return newTask;
    } catch (e) {
      throw e;
    }
  },

  async updateTask(
    _id: string,
    update: {
      title: string;
      description: string;
      hoursEstimated: number;
      completed: boolean;
    }
  ) {
    try {
      const taskCollection = await tasks();

      // Find existing comments
      const existing = await taskCollection.findOne({ _id });

      if (existing) {
        const { comments } = existing;

        taskCollection.updateOne({ _id }, { ...update, comments });

        return taskCollection.findOne({ _id });
      } else {
        throw noSuchMember;
      }
    } catch (e) {
      throw e;
    }
  },

  async patchTask(
    _id: string,
    patch: {
      title?: string;
      description?: string;
      hoursEstimated?: number;
      completed?: boolean;
    }
  ) {
    const taskCollection = await tasks();

    taskCollection.updateOne({ _id }, patch);

    return taskCollection.findOne({ _id });
  },

  async createComment(commentData: {
    name: string;
    comment: string;
  }): Promise<Comment> {
    try {
      const taskCollection = await tasks();

      const comment: Comment = {
        _id: uuid(),
        ...commentData
      };

      taskCollection.insertOne(comment);

      return comment;
    } catch (e) {
      throw e;
    }
  },

  async deleteComment(taskId: string, commentId: string) {
    const taskCollection = await tasks();

    const task = await taskCollection.findOne({ _id: taskId });

    if (task) {
      const comment = task.comments.find(cmt => cmt._id === commentId);

      if (comment) {
        const commentIndex = task.comments.indexOf(comment);

        const newComments = task.comments
          .slice(0, commentIndex)
          .concat(task.comments.slice(commentIndex + 1));
        const newTask = { ...task, comments: newComments };

        taskCollection.updateOne(task, newTask);

        return comment;
      }
    }

    throw noSuchMember;
  }
};
