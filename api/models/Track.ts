import mongoose, { Schema, Types } from 'mongoose';
import Album from './Album';
import User from './User';

const TrackSchema = new mongoose.Schema({
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

  album: {
    type: Schema.Types.ObjectId,
    ref: 'Album',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const album = await Album.findById(value);
        return Boolean(album);
      },
      message: 'Albums does not exist',
    },
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  duration: {
    type: String,
  },
  number: {
    type: Number,
    required: true,
    validate: {
      validator: function (value: number) {
        return value > 0;
      },
      message: 'Track number must be a positive number',
    },
  },
  isPublished: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Track = mongoose.model('Track', TrackSchema);

export default Track;
