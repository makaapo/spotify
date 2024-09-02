import {Router} from 'express';
import {imagesUpload} from "../multer";
import mongoose from "mongoose";
import Album from "../models/Album";

const albumsRouter = Router();

albumsRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
  try {
    const albumMutation = {
      title: req.body.title,
      artist: req.body.artist,
      release: req.body.release,
      image: req.file ? req.file.filename : null,
    };

    const album = new Album(albumMutation);
    await album.save();

    res.send(album);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }
    next(e);
  }
});

albumsRouter.get('/', async (req, res, next) => {
  try {
    const album = await Album.find();
    return res.send(album);
  } catch (e) {
    next(e);
  }
});

export default albumsRouter