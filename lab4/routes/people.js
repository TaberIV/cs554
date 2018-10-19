import express from "express";
import redis from "redis-promisify";
import { getById } from "../data";

const router = express.Router();
const client = redis.createClient();

client.on("error", e => console.log(e));

const recentUsers = [];

router.get("/history", (req, res) => {
  res.json(recentUsers.slice(0, 20));
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  // Check cache for user
  let user = JSON.parse(await client.getAsync(id));

  // Check database for user
  if (!user) {
    try {
      user = await getById(id);
    } catch (e) {
      throw e;
    }
  }

  // Add user to history
  if (user) {
    recentUsers.unshift(user);
  }

  res.json(user);

  // Add user to cache
  if (user) {
    await client.setAsync(id, JSON.stringify(user));
  }
});

export default router;
