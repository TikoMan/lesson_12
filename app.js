import express, { json, urlencoded } from 'express';
import path from 'path';
import HttpError from 'http-errors';
import errorHandler from './middlwears/errorHandler';
import cors from './middlwears/cores';
import authorization from './middlwears/authorization';
import indexRouter from './routes/index';

const { PORT, HOST } = process.env;

process.env.TZ = 'UTC';

const app = express();

app.use(cors);
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(express.static(path.resolve('public')));

app.use(authorization);

app.use(indexRouter);

app.use((req, res, next) => {
  next(HttpError(404));
});

app.use(errorHandler);
console.log('111');

app.listen(PORT, HOST, () => {
  // eslint-disable-next-line no-console
  console.log('Server Started....');
});
