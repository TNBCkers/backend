import { sign, verify } from 'jsonwebtoken';
import Token from '../models/Token/model';
import { SIGNING_KEY, REFRESH_SECRET, TOKEN_EXPIRY } from '../index';

export const generateJWT = async (userId: string): Promise<string> => {
  return sign(
    {
      userId,
    },
    SIGNING_KEY,
    {
      expiresIn: parseInt(TOKEN_EXPIRY, 10),
    }
  );
};

export const generateRefreshJWT = async (userId: string): Promise<string> => {
  return sign(
    {
      userId,
    },
    REFRESH_SECRET
  );
};

export interface Tokens {
  refreshToken: string;
  accessToken: string;
}

export const generateAndDeleteTokens = async (
  userId: string
): Promise<Tokens> => {
  await Token.deleteOne({ userId }).catch(() => console.log('Token Not Found'));

  const refreshToken = await generateRefreshJWT(userId);
  const accessToken = await generateJWT(userId);

  await Token.create({ userId, token: refreshToken });

  return { refreshToken, accessToken };
};

export const verifyToken = (token: string) => {
  const userId = verify(token, process.env.REFRESH_SECRET);
  return userId as string;
};

export const getTokenFromAuthorizationHeader = (headerValue: string): string =>
  headerValue.replace('Bearer ', '');
