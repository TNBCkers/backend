import User from '../models/User/model';
import { getUserIdFromIdToken } from './google.service';
import { UserInterface } from '../models/User/model';

export const getUserById = async (id: string | any) =>
  await User.findById(id).lean();

export const getUserFromUserId = async (userId: string | any) =>
  await User.find({ userId });

export const getUserByIdToken = async (idToken: string | any) => {
  const { userId } = await getUserIdFromIdToken(idToken);
  return await getUserFromUserId(userId);
};

export const createFromPayload = async (
  payLoad: UserInterface,
  idToken: string
) => {
  const userId = await getUserIdFromIdToken(idToken);
  const newPayLoad = { ...payLoad, ...userId };
  return await User.create(newPayLoad);
};
