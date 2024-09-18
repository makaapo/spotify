import express from 'express';
import mongoose from "mongoose";
import Track from "../models/Track";

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

tracksRouter.post('/', async (req, res, next) => {
  try {
    const trackMutation = {
      title: req.body.title,
      album: req.body.album,
      duration: req.body.duration,
      number: parseFloat(req.body.number),
    };

    const track = new Track(trackMutation);
    await track.save();

    res.send(track);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }
    next(e);
  }
});

export default tracksRouter