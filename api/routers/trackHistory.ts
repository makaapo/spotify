import express from 'express';
import mongoose from "mongoose";
import TrackHistory from "../models/TrackHistory";
import User from '../models/User';
import Track from '../models/Track';

const trackHistoryRouter = express.Router();


trackHistoryRouter.post('/', async (req, res, next) => {
  try {
    const header = req.get('Authorization');

    if (!header) {
      return res.status(401).send({error: 'Header "Authorization" not found'});
    }

    const [_bearer, token] = header.split(' ');

    if (!token) {
      return res.status(401).send({error: 'Token not found'});
    }

    const user = await User.findOne({ token });

    if(!user) {
      return res.status(401).send({error: 'Wrong Token!'});
    }

    const trackHistory = new TrackHistory({
      user: user._id,
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

trackHistoryRouter.get('/', async (req, res, next) => {
  const header = req.get('Authorization');

  const token = header && header.split(' ')[1];
  try {
    if (!token) {
      return res.status(401).send({error: "No token present"});
    }

    const user = await User.findOne({token});

    if(!user) {
      return res.status(401).send({error: 'Wrong token'})
    }

    let track;

    if (req.query.trackId) {
      track = await Track.findOne({_id: req.query.trackId});
      if (!track) {
        return res.status(404).send({error: 'Track not found'});
      }
    }

    let trackHistory;
    if (track) {
      trackHistory = await TrackHistory.find({user: user._id, track: track._id});
    } else {
      trackHistory = await TrackHistory.find({user: user._id})
        .populate( {
          path: 'track',
          populate: {
            path: 'album',
            model: 'Album',
            populate: {
              path: 'artist',
              model: 'Artist',
            }
          }
        }).sort({datetime: -1});
    }

    return res.send(trackHistory);

  } catch (e) {
    next(e);
  }
});

export default trackHistoryRouter