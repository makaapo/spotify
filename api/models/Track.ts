import mongoose, {Schema, Types} from 'mongoose';
import Album from "./Album";

const TrackSchema = new mongoose.Schema({
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
    }
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
  },
  isPublished: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Track = mongoose.model('Track', TrackSchema);

export default Track;