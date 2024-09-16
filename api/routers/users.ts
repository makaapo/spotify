import express from 'express';
import User from '../models/User';
import mongoose from 'mongoose';

const usersRouter = express.Router();

usersRouter.post('/', async (req, res, next) => {
  try {
    if (!req.body.username || !req.body.password) {
      return res.status(400).send({error: 'Username and password are required!'});
    }
    const user = new User({
      username: req.body.username,
      password: req.body.password,
    });


    user.generateToken();
    await user.save();
    return res.send(user);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    next(error);
  }
});
usersRouter.post('/sessions', async (req, res, next) => {
  try {
    if (!req.body.username || !req.body.password) {
      return res.status(400).send({ error: 'Username and password are required!' });
    }

    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      return res.status(400).send({ error: 'Username not found!' });
    }

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
      return res.status(400).send({ error: 'Password not found!' });
    }

    user.generateToken();
    await user.save();

    return res.send(user);
  } catch (e) {
    next(e);
  }
});


export default usersRouter