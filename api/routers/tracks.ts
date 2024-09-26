import express from 'express';
import mongoose from 'mongoose';
import Track from "../models/Track";
import auth, {RequestWithUser} from '../middleware/auth';
import permit from '../middleware/permit';

const tracksRouter = express.Router();

tracksRouter.get('/', async (req, res, next) => {
  try {
    let album;

    if (req.query.album) {
      album =  await Track.find({album: req.query.album}).populate('album').sort({number: 1});
    } else {
      album = await Track.find().sort({number: 1});
    }
    return res.send(album);
  } catch (e) {
    next(e);
  }
});

tracksRouter.post('/', auth, permit('admin', 'user'),
  async (req: RequestWithUser, res, next) => {
  try {
    const track = Track.create( {
      user: req.user?._id,
      title: req.body.title,
      album: req.body.album,
      duration: req.body.duration,
      number: parseFloat(req.body.number),
    });

    res.send(track);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }
    next(e);
  }
});

tracksRouter.delete('/:id', auth, permit('admin', 'user'),
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
          await Track.findByIdAndDelete(_id);
          return res.send({message: 'Track was deleted by admin'});
        } else if (isUser) {
          await Track.findOneAndDelete({_id, user: req.user?._id, isPublished: false});
          return res.send({message: 'Track was deleted by user'});
        }
      } else {
        return res.status(403).send({error: 'Forbidden! You do not have permission to delete!'});
      }
    } catch (e) {
      next(e);
    }
  },
);

export default tracksRouter