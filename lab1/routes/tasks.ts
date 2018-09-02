import express, { Request, Response } from "express";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  const { skip, take }: { skip?: number; take?: number } = req.query;

  res.json({ skip, take });
});

export default router;
