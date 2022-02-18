import { Router } from "express";
import User from "../models/User/model";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.get("/:userId", (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) return res.sendStatus(404);
    const user = User.findById(userId).lean();
    if (user) return res.json(user);
    res.status(404).json({ message: "User doesn't exist." });
  } catch (e) {
    res.sendStatus(500);
  }
});

router.use(authMiddleware);
export default router;
