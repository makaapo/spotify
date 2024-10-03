import express from 'express';
import mongoose from 'mongoose';
import TrackHistory from '../models/TrackHistory';
import Track from '../models/Track';
import auth, { RequestWithUser } from '../middleware/auth';

const trackHistoryRouter = express.Router();

trackHistoryRouter.post('/', auth, async (req: RequestWithUser, res, next) => {
  try {
    const trackHistory = new TrackHistory({
      user: req.user?._id,
      track: req.body.track,
      datetime: new Date().toISOString(),
    });

    trackHistory.generateToken();

    await trackHistory.save();
    res.send(trackHistory);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }
    next(e);
  }
});

trackHistoryRouter.get('/', auth, async (req: RequestWithUser, res, next) => {
  try {
    let track;

    if (req.query.trackId) {
      track = await Track.findOne({ _id: req.query.trackId });
      if (!track) {
        return res.status(404).send({ error: 'Track not found' });
      }
    }

    let trackHistory;
    if (track) {
      trackHistory = await TrackHistory.find({ user: req.user?._id, track: track._id });
    } else {
      trackHistory = await TrackHistory.find({ user: req.user?._id })
        .populate({
          path: 'track',
          populate: {
            path: 'album',
            model: 'Album',
            populate: {
              path: 'artist',
              model: 'Artist',
            },
          },
        })
        .sort({ datetime: -1 });
    }

    return res.send(trackHistory);
  } catch (e) {
    next(e);
  }
});

export default trackHistoryRouter;
