import { model, Schema } from "mongoose";

export const USER_MODEL_NAME = "User";

export interface UserInterface {
  _id: string;
  name: string;
  avatar: string;
  description: string;
  tagline: string;
}

export const UserSchema = new Schema<UserInterface>({
  _id: { unique: true, type: String, required: true },
  name: { type: String, required: true },
  avatar: { type: String, required: true },
  description: { type: String, required: true },
  tagline: { type: String, required: true },
});

const User = model(USER_MODEL_NAME, UserSchema);

export default User;
