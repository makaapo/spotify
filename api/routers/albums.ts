import express from 'express';
import {imagesUpload} from "../multer";
import mongoose, {Types} from 'mongoose';
import Album from "../models/Album";

const albumsRouter= express.Router();

albumsRouter.get('/', async (req, res, next) => {
  try {
    let artist;

    if (req.query.artist) {
      artist =  await Album.find({artist: req.query.artist}).populate('artist');
    } else {
      artist = await Album.find().populate('artist', 'title');
    }

    return res.send(artist);
  } catch (e) {
    next(e);
  }
});

albumsRouter.get('/:id', async (req, res, next) => {
  try {
    let _id;
    try {
      _id = new Types.ObjectId(req.params.id);
    } catch {
      return res.status(400).send({error: 'Wrong Id!'});
    }
    const album = await Album.findById(_id).populate('artist');

    if (!album) {
      return res.status(404).send({error: 'Not found!'});
    }

    res.send(album);
  } catch (e) {
    next(e);
  }
});

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

export default albumsRouter