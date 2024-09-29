import {imagesUpload} from '../multer';
import mongoose from 'mongoose';
import Artist from '../models/Artist';
import express from 'express';
import auth, {RequestWithUser} from '../middleware/auth';
import permit from '../middleware/permit';
import roleForUser from '../middleware/roleForUser';

const artistsRouter = express.Router();

artistsRouter.get('/', roleForUser, async (req: RequestWithUser, res, next) => {
  try {
    let artists;
    if (req.user) {
      const isAdmin = req.user.role === 'admin';
      const isUser = req.user.role === 'user';

      if (isAdmin) {
        artists = await Artist.find({}, {user: 0});
      }

      if (isUser) {
        artists = await Artist.find(
          {
            $or: [{isPublished: true}, {user: req.user._id, isPublished: false}],
          },
          {user: 0 },
        );
      }
    } else {
      artists = await Artist.find({isPublished: true}, {user: 0});
    }
    return res.send(artists);
  } catch (e) {
    return next(e);
  }
});

artistsRouter.get('/:id', async (req, res, next) => {
  try {
    if (!req.params.id) {
      res.status(400).send({error: 'Wrong Id!'});
    }

    const artist = await Artist.findById(req.params.id);
    return res.send(artist);
  } catch (e) {
    next(e);
  }
});


artistsRouter.post('/',auth, permit('admin', 'user'), imagesUpload.single('image'),
  async (req: RequestWithUser, res, next) => {
  try {
    const artist = await Artist.create({
      user: req.user?._id,
      title: req.body.title,
      image: req.file ? req.file.filename : null,
      description: req.body.description,
    });

    res.send(artist);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }
    next(e);
  }
});

artistsRouter.delete('/:id', auth, permit('admin', 'user'),
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
          await Artist.findByIdAndDelete(_id);
          return res.send({message: 'Artist was deleted by admin'});
        } else if (isUser) {
          await Artist.findOneAndDelete({_id, user: req.user?._id, isPublished: false});
          return res.send({message: 'Artist was deleted by user'});
        }
      } else {
        return res.status(403).send({error: 'Forbidden! You do not have permission to delete!'});
      }
    } catch (e) {
      next(e);
    }
  },
);

artistsRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
  try {
    if (!req.params.id) {
      return res.status(400).send({error: 'Wrong artist ID'});
    }
    const artist = await Artist.findById(req.params.id);

    if (!artist) {
      return res.status(404).send({error: 'Artist not found'});
    }

    artist.isPublished = !artist.isPublished;

    await artist.save();

    return res.send(artist);
  } catch (e) {
    return next(e);
  }
});


export default artistsRouter