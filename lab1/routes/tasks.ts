import express, { Request, Response } from "express";
import { Collection } from "mongodb";
import { tasks } from "../data";
import { Task } from "../Types";

const router = express.Router();

// Get Tasks
router.get("/", async (req: Request, res: Response) => {
  const skip = Number(req.query.skip);
  const take = Number(req.query.take);

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
  try {
    const task = await tasks.createTask(req.body);
    res.json(task);
  } catch (e) {
    res.status(404).json({ error: e, message: e.message });
  }
});

router.put("/:_id", async (req: Request, res: Response) => {
  const { _id } = req.params;

  try {
    const task = await tasks.updateTask(_id, req.body);
    res.json(task);
  } catch (e) {
    res.status(404).json({ error: e, message: e.message });
  }
});

export default router;
