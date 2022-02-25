import User from "../models/User/model";
import { getUserIdFromIdToken } from "./google.service";

export const getUserById = async (id: string | any) =>
  await User.findById(id).lean();

export const getUserByIdToken = async (idToken: string | any) => {
  const { userId } = await getUserIdFromIdToken(idToken);
  return await getUserById(userId);
};
