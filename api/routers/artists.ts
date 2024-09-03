import {imagesUpload} from '../multer';
import mongoose from 'mongoose';
import Artist from '../models/Artist';
import express from 'express';

const artistsRouter = express.Router();

artistsRouter.get('/', async (req, res, next) => {
  try {
    const artist = await Artist.find();
    return res.send(artist);
  } catch (e) {
    next(e);
  }
});

artistsRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
  try {
    const artistMutation = {
      title: req.body.title,
      image: req.file ? req.file.filename : null,
      description: req.body.description,
    };

    const artist = new Artist(artistMutation);
    await artist.save();

    res.send(artist);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }
    next(e);
  }
});

export default artistsRouter