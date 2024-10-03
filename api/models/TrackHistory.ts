import mongoose, { Schema, Types } from 'mongoose';
import User from './User';
import Track from './Track';
import { randomUUID } from 'node:crypto';
import { TrackHistoryFields, TrackHistoryMethods, TrackHistoryModel } from '../types';

const TrackHistorySchema = new Schema<TrackHistoryFields, TrackHistoryModel, TrackHistoryMethods>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const user = await User.findById(value);
        return Boolean(user);
      },
      message: 'User does not exist',
    },
  },
  track: {
    type: Schema.Types.ObjectId,
    ref: 'Track',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const track = await Track.findById(value);
        return Boolean(track);
      },
      message: 'Track does not exist',
    },
  },
  datetime: {
    type: Date,
    default: () => new Date(),
  },
  token: {
    type: String,
    required: true,
  },
});

TrackHistorySchema.methods.generateToken = function () {
  this.token = randomUUID();
};

const TrackHistory = mongoose.model<TrackHistoryFields, TrackHistoryModel>('TrackHistory', TrackHistorySchema);

export default TrackHistory;
