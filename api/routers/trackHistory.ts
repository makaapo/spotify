import express from 'express';
import mongoose from "mongoose";
import TrackHistory from "../models/TrackHistory";
import User from '../models/User';

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

export default trackHistoryRouter