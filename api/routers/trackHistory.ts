import express from 'express';
import mongoose from "mongoose";
import TrackHistory from "../models/TrackHistory";

const trackHistoryRouter = express.Router();

trackHistoryRouter.get('/', async (req, res, next) => {
  try {
    const trackHistory = await TrackHistory.find();
    return res.send(trackHistory);
  } catch (e) {
    next(e);
  }
});

trackHistoryRouter.post('/', async (req, res, next) => {

  try {
    const trackHistoryData = {
      user: req.body.user,
      track: req.body.track,
      datetime: req.body.datetime,
    };
    const trackHistory = new TrackHistory(trackHistoryData);
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