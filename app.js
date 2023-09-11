const morgan = require('morgan');
const express = require('express');
const cors = require('cors');
const compression = require('compression');

const nationRouter = require('./routes/nationRoutes');
const teamRouter = require('./routes/teamRoutes');
const iconRouter = require('./routes/iconRoutes');
const userRouter = require('./routes/userRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorControllers');

const app = express();

app.use(compression());

app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'DELETE', 'PATCH'],
  }),
);

app.use(morgan('dev'));

app.use(express.json());

app.use((req, res, next) => {
  // console.log('hello from the middlleware xaxaxaax');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});

app.use('/api/v1/nations', nationRouter);
app.use('/api/v1/teams', teamRouter);
app.use('/api/v1/icons', iconRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError('Route unavailabel', 404));
});

app.use(globalErrorHandler);

module.exports = app;

// commit
