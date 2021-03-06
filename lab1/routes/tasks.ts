import express, { Request, Response } from "express";
import { Collection } from "mongodb";
import { cpus } from "os";
import { tasks } from "../data";
import { Task } from "../Types";

const router = express.Router();

const missingDetails = { error: "Missing/Invalid details." };

function checkDetails(title: any, description: any, hoursEstimated: any) {
  return (
    title &&
    typeof title === "string" &&
    description &&
    typeof description === "string" &&
    typeof hoursEstimated === "number" &&
    hoursEstimated > 0
  );
}

// Get Tasks
router.get("/", async (req: Request, res: Response) => {
  try {
    let skip = Number(req.query.skip);
    let take = Number(req.query.take);

    skip = !skip ? 0 : skip;
    take = !take ? 20 : Math.min(take, 100);

    res.json(await tasks.getTasks(skip, take));
  } catch (e) {
    res.json({ error: e, message: e.message });
  }
});

// Get task by Id
router.get("/:_id", async (req: Request, res: Response) => {
  const { _id } = req.params;

  try {
    const task = await tasks.getTaskById(_id);
    res.json(task);
  } catch (e) {
    res.json({ error: e, message: e.message });
  }
});

router.post("/", async (req: Request, res: Response) => {
  const { title, description, hoursEstimated, completed } = req.body;

  if (!checkDetails(title, description, hoursEstimated)) {
    res.json(missingDetails);

    return;
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
    res.json({ error: e, message: e.message });
  }
});

router.put("/:_id", async (req: Request, res: Response) => {
  const { _id } = req.params;
  const { title, description, hoursEstimated, completed } = req.body;

  if (!checkDetails(title, description, hoursEstimated)) {
    res.json(missingDetails);

    return;
  }

  try {
    const task = await tasks.updateTask(_id, {
      title,
      description,
      hoursEstimated,
      completed: completed === true
    });

    res.json(task);
  } catch (e) {
    res.json({ error: e, message: e.message });
  }
});

router.patch("/:_id", async (req: Request, res: Response) => {
  const { _id } = req.params;
  const { title, description, hoursEstimated, completed } = req.body;

  if (
    (title && typeof title !== "string") ||
    (description && typeof description !== "string") ||
    (hoursEstimated && typeof hoursEstimated !== "number") ||
    (completed && typeof completed !== "boolean")
  ) {
    res.json(missingDetails);
  }

  try {
    interface Details {
      title?: string;
      description?: string;
      hoursEstimated?: number;
      completed?: boolean;
      [key: string]: any; // This just made it work :/
    }

    const details: Details = { title, description, hoursEstimated, completed };
    const update: Details = {};

    Object.keys(details).forEach(async key => {
      if (details[key]) {
        update[key] = details[key];
      }
    });

    const task = await tasks.updateTask(_id, update);

    res.json(task);
  } catch (e) {
    res.json({ error: e, message: e.message });
  }
});

router.post("/:_id/comments", async (req: Request, res: Response) => {
  const { _id } = req.params;
  const { name, comment } = req.body;

  if (typeof name !== "string" || typeof comment !== "string") {
    res.json(missingDetails);
    return;
  }

  try {
    const returnComment = await tasks.createComment(_id, { name, comment });
    res.json(returnComment);
  } catch (e) {
    res.json({ error: e, message: e.message });
  }
});

router.delete("/:taskId/:commentId", async (req: Request, res: Response) => {
  const { taskId, commentId } = req.params;

  try {
    const ret = await tasks.deleteComment(taskId, commentId);
    res.json(ret);
  } catch (e) {
    res.json({ error: e, message: e.message });
  }
});

export default router;
