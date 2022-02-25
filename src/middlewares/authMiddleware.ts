import express from "express";
import { JsonWebTokenError, JwtPayload, verify } from "jsonwebtoken";
import { getTokenFromAuthorizationHeader } from "../services/auth.service";
import { SIGNING_KEY } from "../index";

const authenticateToken: express.RequestHandler = (req: any, res, next) => {
  const token = getTokenFromAuthorizationHeader(req.headers.authorization);

  if (!token) return res.sendStatus(401);

  verify(token, SIGNING_KEY, (err: JsonWebTokenError, userId: JwtPayload) => {
    if (err) return res.sendStatus(403);
    req.userId = userId;
    next();
  });
};

export default authenticateToken;
