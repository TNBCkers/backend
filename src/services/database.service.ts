import { connect } from "mongoose";
import { noop } from "lodash";
import { MONGO_URI } from "../index";

export const init = async () => {
  try {
    await connect(MONGO_URI);
    console.info("Successfully connected to DB");
  } catch (e) {
    console.error(e.message);
  }
};

init().then(noop).catch(noop);
