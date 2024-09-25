import mongoose from 'mongoose';

const ArtistSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: String,
  image: String,
  isPublished: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Artist = mongoose.model('Artist', ArtistSchema);

export default Artist;