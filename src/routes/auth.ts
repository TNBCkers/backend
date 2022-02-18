import { Router } from "express";
import { getUserIdFromIdToken } from "../services/googleService";
import {
  generateRefreshJWT,
  generateJWT,
  generateAndDeleteTokens,
  verifyToken,
} from "../services/authService";
import Token from "../models/Token/model";

const router = Router();

router.post("/google", async (req, res) => {
  try {
    const { idToken } = req.body;
    if (!idToken) return res.sendStatus(404);
    const { userId } = await getUserIdFromIdToken(idToken);
    const { refreshToken, accessToken } = await generateAndDeleteTokens(userId);
    res.json({ refreshToken, accessToken });
  } catch (e) {
    res.sendStatus(500);
  }
});

router.post("/token", async (req, res) => {
  try {
    const { refreshToken } = req.body.token;
    if (!refreshToken) return res.sendStatus(403);

    const userId = verifyToken(refreshToken);
    const tokenDoc = await Token.findOne({ token: refreshToken });
    if (!tokenDoc) return res.sendStatus(403);
    await tokenDoc.delete();
    const newRefresh = await generateRefreshJWT(userId);
    const accessToken = await generateJWT(userId);
    await Token.create({ token: newRefresh, userId });
    res.json({ refreshToken: newRefresh, accessToken });
  } catch (e) {
    res.sendStatus(403);
  }
});

export default router;
