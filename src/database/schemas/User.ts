import mongoose, { Schema, Document } from 'mongoose';

export interface IUser{
  _id?: any;
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface IUserDocument extends Document {
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema = new Schema<IUserDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
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

const model = mongoose.model<IUserDocument>('User', UserSchema);

export default model;
