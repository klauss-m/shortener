import express from 'express';
import crypto from 'crypto';
import morgan from 'morgan';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import UserRouter from './src/routes/UserRoute.js';
import ShortenerRouter from './src/routes/ShortenerRouter.js';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log('MongoDB Connected!');
  })
  .catch((error) => {
    console.log({ error });
  });

app.use(express.json());
app.use(morgan('dev'));
app.use(UserRouter);
app.use(ShortenerRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
