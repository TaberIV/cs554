import express, { Request, Response } from "express";
import { Collection } from "mongodb";
import { tasks } from "../data";
import { Task } from "../Types";

const router = express.Router();

const missingDetails = new Error("Missing details.");

// Get Tasks
router.get("/", async (req: Request, res: Response) => {
  let skip = Number(req.query.skip);
  let take = Number(req.query.take);

  skip = !skip ? 0 : skip;
  take = !take ? 20 : Math.min(take, 100);

  try {
    res.json(await tasks.getTasks(skip, take));
  } catch (e) {
    res.status(404).json({ error: e, message: e.message });
  }
});

// Get task by Id
router.get("/:_id", async (req: Request, res: Response) => {
  const { _id } = req.params;

  try {
    const task = await tasks.getTaskById(_id);
    res.json(task);
  } catch (e) {
    res.status(404).json({ error: e, message: e.message });
  }
});

router.post("/", async (req: Request, res: Response) => {
  const { title, description, hoursEstimated, completed } = req.body;

  if (!title || !description || !(hoursEstimated > 0)) {
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
    res.status(404).json({ error: e, message: e.message });
  }
});

router.put("/:_id", async (req: Request, res: Response) => {
  const { _id } = req.params;
  const { title, description, hoursEstimated, completed } = req.body;

  if (!title || !description || !(hoursEstimated > 0)) {
    throw missingDetails;
  }

  try {
    const task = await tasks.updateTask(_id, {
      title,
      description,
      hoursEstimated,
      completed
    });
    res.json(task);
  } catch (e) {
    res.status(404).json({ error: e, message: e.message });
  }
});

export default router;
