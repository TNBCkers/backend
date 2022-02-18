import { model, Schema } from "mongoose";

export const TOKEN_MODEL_NAME = "Token";

export interface TokenInterface {
  userId: string;
  token: string;
}

export const TokenSchema = new Schema({
  token: { type: String, required: true, unique: true },
  userId: { type: String, required: true, unique: true },
});

const Token = model(TOKEN_MODEL_NAME, TokenSchema);

export default Token;
