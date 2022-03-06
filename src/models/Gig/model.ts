import { model, Schema, ObjectId } from 'mongoose';
import { USER_MODEL_NAME } from '../User/model';

export const GIG_MODEL_NAME = 'Gig';

export interface GigInterface {
  userid: ObjectId;
  title: string;
  description: string;
  category: string;
  price: number;
  thumbnail: string;
}

export const GigSchema = new Schema<GigInterface>({
  userid: {
    type: Schema.Types.ObjectId,
    ref: USER_MODEL_NAME,
    required: true,
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  thumbnail: { type: String, required: true },
});

const Gig = model(GIG_MODEL_NAME, GigSchema);

export default Gig;
