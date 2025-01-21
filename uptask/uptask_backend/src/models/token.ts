import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IToken extends Document {
  token: string;
  user: Types.ObjectId;
  createdAt: Date;
}

const tokenSchema = new Schema({
  token: {
    type: String,
    required: true,
  },
  user: {
    type: Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    // Delete this item after the following time
    expires: '10m',
  },
});

const Token = mongoose.model<IToken>('Token', tokenSchema);

export default Token;
