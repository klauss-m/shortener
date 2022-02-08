import express from 'express';
import crypto from 'crypto';
import morgan from 'morgan';
import UserRouter from './src/routes/UserRoute.js';

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use('/api', UserRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
