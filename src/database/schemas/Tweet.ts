import mongoose, { Schema, Document } from 'mongoose';
import normalize from 'normalize-mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { IUser } from "./User";

export interface ITweet {
  id?: any;
  author: IUser;
  description: string;
  likes: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITweetDocument extends Document {
  author: mongoose.Schema.Types.ObjectId;
  description: string;
  likes: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const TweetSchema = new Schema<ITweetDocument>(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    description: String,
    likes: {
      type: Number,
      default: 0,
      required: false
    },
    createdAt: {
      type: Date,
      default: Date.now,
      required: false
    },
    updatedAt: {
      type: Date,
      default: Date.now,
      required: false
    },
  },
  {
    timestamps: {},
  },
);

TweetSchema.plugin(normalize);
TweetSchema.plugin(mongoosePaginate);

const model = mongoose.model('Tweet', TweetSchema);

export default model;
