import express from 'express';
import {imagesUpload} from "../multer";
import mongoose, {Types} from 'mongoose';
import Album from "../models/Album";
import auth, {RequestWithUser} from '../middleware/auth';
import permit from '../middleware/permit';

const albumsRouter= express.Router();

albumsRouter.get('/', async (req, res, next) => {
  try {
    let artist;

    if (req.query.artist) {
      artist =  await Album.find({artist: req.query.artist}).populate('artist').sort({release: -1});
    } else {
      artist = await Album.find().populate('artist', 'title').sort({release: -1});
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

albumsRouter.post('/', auth, permit('admin', 'user'), imagesUpload.single('image'),
  async (req: RequestWithUser, res, next) => {
  try {
    const album = Album.create({
      user: req.user?._id,
      title: req.body.title,
      artist: req.body.artist,
      release: req.body.release,
      image: req.file ? req.file.filename : null,
    });

    res.send(album);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }
    next(e);
  }
});

albumsRouter.delete('/:id', auth, permit('admin', 'user'),
  async (req: RequestWithUser, res, next) => {
    try {
      if (!req.user?._id) {
        return res.status(400).send({error: 'User ID is wrong!'});
      }
      const _id = req.params.id;

      if (req.user) {
        const isAdmin = req.user?.role === 'admin';
        const isUser = req.user?.role === 'user';

        if (isAdmin) {
          await Album.findByIdAndDelete(_id);
          return res.send({message: 'Album was deleted by admin'});
        } else if (isUser) {
          await Album.findOneAndDelete({_id, user: req.user?._id, isPublished: false});
          return res.send({message: 'Album was deleted by user'});
        }
      } else {
        return res.status(403).send({error: 'Forbidden! You do not have permission to delete!'});
      }
    } catch (e) {
      next(e);
    }
  },
);


export default albumsRouter