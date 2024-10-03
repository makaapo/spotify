import express from 'express';
import { imagesUpload } from '../multer';
import mongoose, { Types } from 'mongoose';
import Album from '../models/Album';
import auth, { RequestWithUser } from '../middleware/auth';
import permit from '../middleware/permit';
import roleForUser from '../middleware/roleForUser';

const albumsRouter = express.Router();

albumsRouter.get('/', roleForUser, async (req: RequestWithUser, res, next) => {
  try {
    let albums;
    const queryArtist = req.query.artist as string;

    if (req.user) {
      const isAdmin = req.user.role === 'admin';
      const isUser = req.user.role === 'user';

      if (isAdmin) {
        albums = await Album.find(queryArtist ? { artist: queryArtist } : {})
          .populate('artist')
          .sort({ release: -1 });
      }

      if (isUser) {
        albums = await Album.find({
          artist: queryArtist,
          $or: [{ isPublished: true }, { user: req.user._id, isPublished: false }],
        })
          .populate('artist')
          .sort({ release: -1 });
      }
    } else {
      albums = await Album.find({
        artist: queryArtist,
        isPublished: true,
      })
        .populate('artist')
        .sort({ release: -1 });
    }

    return res.send(albums);
  } catch (e) {
    return next(e);
  }
});

albumsRouter.get('/:id', async (req, res, next) => {
  try {
    let _id;
    try {
      _id = new Types.ObjectId(req.params.id);
    } catch {
      return res.status(400).send({ error: 'Wrong Id!' });
    }
    const album = await Album.findById(_id).populate('artist');

    if (!album) {
      return res.status(404).send({ error: 'Not found!' });
    }

    res.send(album);
  } catch (e) {
    next(e);
  }
});

albumsRouter.post(
  '/',
  auth,
  permit('admin', 'user'),
  imagesUpload.single('image'),
  async (req: RequestWithUser, res, next) => {
    try {
      const releaseYear = parseFloat(req.body.release);

      if (isNaN(releaseYear) || releaseYear <= 0) {
        return res.status(400).send({ error: 'Release year must be a positive number greater than zero' });
      }
      const album = Album.create({
        user: req.user?._id,
        title: req.body.title,
        artist: req.body.artist,
        release: releaseYear,
        image: req.file ? req.file.filename : null,
      });

      res.send(album);
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(400).send(e);
      }
      next(e);
    }
  },
);

albumsRouter.delete('/:id', auth, permit('admin', 'user'), async (req: RequestWithUser, res, next) => {
  try {
    if (!req.user?._id) {
      return res.status(400).send({ error: 'User ID is wrong!' });
    }
    const _id = req.params.id;

    if (req.user) {
      const isAdmin = req.user?.role === 'admin';
      const isUser = req.user?.role === 'user';

      if (isAdmin) {
        await Album.findByIdAndDelete(_id);
        return res.send({ message: 'Album was deleted by admin' });
      } else if (isUser) {
        await Album.findOneAndDelete({ _id, user: req.user?._id, isPublished: false });
        return res.send({ message: 'Album was deleted by user' });
      }
    } else {
      return res.status(403).send({ error: 'Forbidden! You do not have permission to delete!' });
    }
  } catch (e) {
    next(e);
  }
});

albumsRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
  try {
    if (!req.params.id) {
      return res.status(400).send({ error: 'Wrong album ID' });
    }

    const album = await Album.findById(req.params.id);

    if (!album) {
      return res.status(404).send({ error: 'Album not found' });
    }

    album.isPublished = !album.isPublished;

    await album.save();

    return res.send(album);
  } catch (e) {
    return next(e);
  }
});

export default albumsRouter;
