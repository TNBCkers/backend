import { GOOGLE_CLIENT_ID } from "../index";

import { googleClient } from "../index";

export const getUserIdFromIdToken = async (idToken: string) => {
  const ticket = await googleClient.verifyIdToken({
    idToken,
    audience: GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  return { userId: payload["sub"] };
};
