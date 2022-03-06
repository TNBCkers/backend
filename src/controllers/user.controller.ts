import { Request, Response } from 'express';
import { getUserIdFromIdToken } from '../services/google.service';
import {
  generateAndDeleteTokens,
  getTokenFromAuthorizationHeader,
} from '../services/auth.service';
import {
  getUserByIdToken,
  getUserById,
  createFromPayload,
} from '../services/user.service';

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
      console.log(user);
      if (user.length) return res.json(user);
    }

    res.status(404).json({ message: "User doesn't exist." });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

export const signUp = async (req: Request, res: Response) => {
  try {
    const payLoad = req.body;
    console.log(payLoad);
    const idToken = getTokenFromAuthorizationHeader(req.headers.authorization);
    const { userId } = await getUserIdFromIdToken(idToken);
    const user = await createFromPayload(payLoad, idToken).catch(() => {
      res.status(401).send({ message: 'Already exists' });
      return null;
    });

    if (!user) return;

    const { refreshToken, accessToken } = await generateAndDeleteTokens(userId);

    res
      .status(201)
      .send({ message: 'User Created!', user, accessToken, refreshToken });
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e.message });
  }
};
