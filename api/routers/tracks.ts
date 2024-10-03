import express from 'express';
import mongoose from 'mongoose';
import Track from '../models/Track';
import auth, { RequestWithUser } from '../middleware/auth';
import permit from '../middleware/permit';
import roleForUser from '../middleware/roleForUser';

const tracksRouter = express.Router();

tracksRouter.get('/', roleForUser, async (req: RequestWithUser, res, next) => {
  try {
    let tracks;

    if (req.user) {
      const isAdmin = req.user.role === 'admin';
      const isUser = req.user.role === 'user';

      if (isAdmin) {
        if (req.query.album) {
          tracks = await Track.find({ album: req.query.album }).populate('album').sort({ number: 1 });
        } else {
          tracks = await Track.find().sort({ number: 1 });
        }
      }

      if (isUser) {
        if (req.query.album) {
          tracks = await Track.find({
            album: req.query.album,
            $or: [{ isPublished: true }, { user: req.user._id, isPublished: false }],
          })
            .populate('album')
            .sort({ number: 1 });
        } else {
          tracks = await Track.find({
            $or: [{ isPublished: true }, { user: req.user._id, isPublished: false }],
          }).sort({ number: 1 });
        }
      }
    } else {
      if (req.query.album) {
        tracks = await Track.find({ album: req.query.album, isPublished: true }).populate('album').sort({ number: 1 });
      } else {
        tracks = await Track.find({ isPublished: true }).sort({ number: 1 });
      }
    }

    return res.send(tracks);
  } catch (e) {
    next(e);
  }
});

tracksRouter.post('/', auth, permit('admin', 'user'), async (req: RequestWithUser, res, next) => {
  try {
    const trackNumber = parseFloat(req.body.number);

    if (isNaN(trackNumber) || trackNumber <= 0) {
      return res.status(400).send({ error: 'Track number must be a positive number greater than zero' });
    }

    const track = await Track.create({
      user: req.user?._id,
      title: req.body.title,
      album: req.body.album,
      duration: req.body.duration,
      number: trackNumber,
    });

    return res.send(track);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }
    next(e);
  }
});

tracksRouter.delete('/:id', auth, permit('admin', 'user'), async (req: RequestWithUser, res, next) => {
  try {
    if (!req.user?._id) {
      return res.status(400).send({ error: 'User ID is wrong!' });
    }

    const _id = req.params.id;

    if (req.user) {
      const isAdmin = req.user?.role === 'admin';
      const isUser = req.user?.role === 'user';

      if (isAdmin) {
        await Track.findByIdAndDelete(_id);
        return res.send({ message: 'Track was deleted by admin' });
      } else if (isUser) {
        await Track.findOneAndDelete({ _id, user: req.user?._id, isPublished: false });
        return res.send({ message: 'Track was deleted by user' });
      }
    } else {
      return res.status(403).send({ error: 'Forbidden! You do not have permission to delete!' });
    }
  } catch (e) {
    next(e);
  }
});

tracksRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
  try {
    if (!req.params.id) {
      return res.status(400).send({ error: 'Wrong track ID' });
    }

    const track = await Track.findById(req.params.id);

    if (!track) {
      return res.status(404).send({ error: 'Track not found' });
    }

    track.isPublished = !track.isPublished;

    await track.save();

    return res.send(track);
  } catch (e) {
    return next(e);
  }
});

export default tracksRouter;
