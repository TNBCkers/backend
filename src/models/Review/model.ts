import { model, ObjectId, Schema } from "mongoose";
import { GIG_MODEL_NAME } from "../Gig/model";
import { USER_MODEL_NAME } from "../User/model";

export const REVIEW_MODEL_NAME = "Review";

export interface ReviewInterface {
  customerId: string;
  sellerId: string;
  gigId: Object;
  value: number;
  message: string;
}

export const ReviewSchema = new Schema<ReviewInterface>({
  customerId: {
    unique: true,
    type: String,
    ref: USER_MODEL_NAME,
  },
  sellerId: {
    unique: true,
    type: String,
    ref: USER_MODEL_NAME,
  },
  gigId: { unique: true, type: Schema.Types.ObjectId, ref: GIG_MODEL_NAME },
  value: { type: Number, required: true },
  message: { type: String, required: true },
});

const Review = model(REVIEW_MODEL_NAME, ReviewSchema);

export default Review;
