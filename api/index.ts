import express from 'express';
import mongoose from 'mongoose';
import config from './config';
import artistsRouter from './routers/artists';
import cors from 'cors';

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors(config.corsOptions));

app.use('/artists', artistsRouter);

const run = async () => {
  await mongoose.connect(config.database);

  app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

run().catch(console.error);