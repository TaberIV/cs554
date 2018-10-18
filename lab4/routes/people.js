import express from "express";
import { getById } from "../data";

const router = express.Router();

const recentUsers = [];

router.get("/history", (req, res) => {
  res.json(recentUsers.slice(0, 19));
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  let user;

  try {
    user = await getById(id);
  } catch (e) {
    throw e;
  }

  recentUsers.unshift(user);

  res.json(user);
});

export default router;
