import express from 'express';
import { config } from 'dotenv';
config();
import { OAuth2Client } from 'google-auth-library';
import authRouter from './routes/auth.router';
import userRouter from './routes/user.router';
import cors from 'cors';

export const MONGO_URI: string = process.env.MONGO_URI;
import { init } from './services/database.service';

export const SIGNING_KEY: string = process.env.SIGNING_KEY;
export const REFRESH_SECRET: string = process.env.REFRESH_SECRET;
export const PORT: string = process.env.PORT;
export const TOKEN_EXPIRY: string = process.env.TOKEN_EXPIRY;
export const GOOGLE_CLIENT_ID: string = process.env.GOOGLE_CLIENT_ID;

export const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID);

const app: express.Application = express();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use('/auth', authRouter);
app.use('/user', userRouter);

app.listen(PORT, async () => {
  await init();
});
