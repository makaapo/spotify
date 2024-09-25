import {Model, Types} from 'mongoose';

export interface UserFields {
  username: string;
  password: string;
  token: string;
  role: string;
}

export interface UserMethods {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}

export type UserModel = Model<UserFields, {}, UserMethods>;

export interface TrackHistoryFields {
  user: Types.ObjectId;
  track: Types.ObjectId;
  datetime: Date;
  token: string;
}

export interface TrackHistoryMethods {
  generateToken(): void;
}

export type TrackHistoryModel = Model<TrackHistoryFields, {}, TrackHistoryMethods>;