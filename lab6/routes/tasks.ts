import express, { Request, Response } from "express";
import { tasks } from "../data";

const router = express.Router();

const missingDetails = new Error("Missing/Invalid details.");

interface IRequestBody {
  title: string;
  description: string;
  hoursEstimated: number;
  completed?: boolean;
}

function checkDetails(params: IRequestBody): boolean {
  const { title, description, hoursEstimated, completed } = params;

  return (
    !!title &&
    typeof title === "string" &&
    !!description &&
    typeof description === "string" &&
    typeof hoursEstimated === "number" &&
    hoursEstimated > 0 &&
    (typeof completed === "boolean" || completed === undefined)
  );
}

// Get Tasks
router.get(
  "/",
  async (req: Request, res: Response): Promise<void> => {
    try {
      let skip = Number(req.query.skip);
      let take = Number(req.query.take);

      if ((req.query.skip && isNaN(skip)) || (req.query.take && isNaN(take))) {
        throw missingDetails;
      }

      skip = !skip ? 0 : skip;
      take = !take ? 20 : Math.min(take, 100);

      res.json(await tasks.getTasks(skip, take));
    } catch (e) {
      res.status(400).json(e);
    }
  }
);

// Get task by Id
router.get(
  "/:_id",
  async (req: Request, res: Response): Promise<void> => {
    const { _id } = req.params;

    try {
      const task = await tasks.getTaskById(_id);
      res.json(task);
    } catch (e) {
      res.status(404).json({ error: e, message: e.message });
    }
  }
);

router.post(
  "/",
  async (req: Request, res: Response): Promise<void> => {
    const { title, description, hoursEstimated, completed } = req.body;

    if (!checkDetails({ title, description, hoursEstimated, completed })) {
      throw missingDetails;
    }

    try {
      const task = await tasks.createTask({
        title,
        description,
        hoursEstimated,
        completed: completed === true
      });

      res.json(task);
    } catch (e) {
      res.status(400).json({ error: e, message: e.message });
    }
  }
);

router.put(
  "/:_id",
  async (req: Request, res: Response): Promise<void> => {
    const { _id } = req.params;
    const { title, description, hoursEstimated, completed } = req.body;

    try {
      if (!checkDetails({ title, description, hoursEstimated, completed })) {
        throw missingDetails;
      }

      const task = await tasks.updateTask(_id, {
        title,
        description,
        hoursEstimated,
        completed: completed === true
      });

      res.json(task);
    } catch (e) {
      if (e === missingDetails) {
        res.status(400).json({ error: e, message: e.message });
      } else {
        res.status(404).json({ error: e, message: e.message });
      }
    }
  }
);

router.patch(
  "/:_id",
  async (req: Request, res: Response): Promise<void> => {
    const { _id } = req.params;
    const { title, description, hoursEstimated, completed } = req.body;

    try {
      if (
        (title && typeof title !== "string") ||
        (description && typeof description !== "string") ||
        (hoursEstimated && typeof hoursEstimated !== "number") ||
        (completed && typeof completed !== "boolean")
      ) {
        throw missingDetails;
      }

      interface Details {
        title?: string;
        description?: string;
        hoursEstimated?: number;
        completed?: boolean;
        [key: string]: any;
      }

      const details: Details = {
        title,
        description,
        hoursEstimated,
        completed
      };
      const update: Details = {};

      Object.keys(details).forEach(async (key) => {
        if (details[key]) {
          update[key] = details[key];
        }
      });

      const task = await tasks.updateTask(_id, update);

      res.json(task);
    } catch (e) {
      if (e === missingDetails) {
        res.status(400).json({ error: e, message: e.message });
      } else {
        res.status(404).json({ error: e, message: e.message });
      }
    }
  }
);

router.post(
  "/:_id/comments",
  async (req: Request, res: Response): Promise<void> => {
    const { _id } = req.params;
    const { name, comment } = req.body;

    try {
      if (typeof name !== "string" || typeof comment !== "string") {
        throw missingDetails;
      }

      const returnComment = await tasks.createComment(_id, { name, comment });
      res.json(returnComment);
    } catch (e) {
      if (e === missingDetails) {
        res.status(400).json({ error: e, message: e.message });
      } else {
        res.status(404).json({ error: e, message: e.message });
      }
    }
  }
);

router.delete(
  "/:taskId/:commentId",
  async (req: Request, res: Response): Promise<void> => {
    const { taskId, commentId } = req.params;

    try {
      const ret = await tasks.deleteComment(taskId, commentId);
      res.json(ret);
    } catch (e) {
      res.status(404).json({ error: e, message: e.message });
    }
  }
);

export default router;
