import { Request, Response } from "express";
import { getUserByIdToken, getUserById } from "../services/user.service";

export const getByIdOrToken = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;
    if (userId) {
      const user = await getUserById(userId);
      if (user) return res.json(user);
    }

    const { idToken } = req.query;
    if (idToken) {
      const user = await getUserByIdToken(idToken);
      if (user) return res.json(user);
    }

    res.status(404).json({ message: "User doesn't exist." });
  } catch (e) {
    res.sendStatus(500);
  }
};
