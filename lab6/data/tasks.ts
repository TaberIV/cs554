import uuid from "uuid/v4";
import { IComment, ITask, tasks } from "../config/mongoCollections";

const noSuchMember = new Error("No such member exist in the database.");

export default {
  async getTasks(skip: number, take: number): Promise<ITask[]> {
    try {
      const taskCollection = await tasks();

      return taskCollection
        .find()
        .limit(skip + take)
        .toArray()
        .then((taskArr) => taskArr.slice(skip));
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
    completed: boolean;
  }) {
    try {
      const taskCollection = await tasks();

      const newTask: ITask = {
        _id: uuid(),
        ...task,
        comments: [] as IComment[]
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
      title?: string;
      description?: string;
      hoursEstimated?: number;
      completed?: boolean;
    }
  ) {
    try {
      const taskCollection = await tasks();

      const existing = await taskCollection.findOne({ _id });

      if (existing) {
        const { comments } = existing;

        await taskCollection.updateOne(
          { _id },
          { $set: { ...update, comments } }
        );

        return taskCollection.findOne({ _id });
      } else {
        throw noSuchMember;
      }
    } catch (e) {
      throw e;
    }
  },

  async createComment(
    _id: string,
    commentData: {
      name: string;
      comment: string;
    }
  ): Promise<IComment> {
    try {
      const taskCollection = await tasks();

      const comment: IComment = {
        _id: uuid(),
        ...commentData
      };

      taskCollection.updateOne({ _id }, { $push: { comments: comment } });

      return comment;
    } catch (e) {
      throw e;
    }
  },

  async deleteComment(taskId: string, commentId: string) {
    try {
      const taskCollection = await tasks();

      return taskCollection.updateOne(
        { _id: taskId },
        { $pull: { comments: { _id: commentId } } }
      );
    } catch (e) {
      throw e;
    }
  }
};
