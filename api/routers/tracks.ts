import {Router} from 'express';
import mongoose from "mongoose";
import Track from "../models/Track";

const tracksRouter = Router();

tracksRouter.post('/', async (req, res, next) => {
  try {
    const trackMutation = {
      title: req.body.title,
      album: req.body.album,
      duration: req.body.duration,
    };

    const track = new Track(trackMutation);
    await track.save();

    res.send(track);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }
    next(e);
  }
});

tracksRouter.get('/', async (req, res, next) => {
  try {
    const track = await Track.find();
    return res.send(track);
  } catch (e) {
    next(e);
  }
});

export default tracksRouter