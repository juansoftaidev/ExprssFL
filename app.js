import cookieParser from 'cookie-parser';
import cors from 'cors'; // CORS middleware
import dotenv from 'dotenv'; // Environment variable management
import express from 'express';
import helmet from 'helmet'; // Security middleware
import createError from 'http-errors';
import logger from 'morgan';
import path from 'path';

// Load environment variables from .env file
dotenv.config();

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';

const app = express();

// View engine setup
app.set('views', path.join(process.cwd(), 'views')); // Use process.cwd() for compatibility
app.set('view engine', 'pug'); // Updated to use pug

// Middleware
app.use(helmet()); // Use helmet for security
app.use(cors()); // Enable CORS
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(process.cwd(), 'public'))); // Use process.cwd() for compatibility

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Error handler
app.use((err, req, res, next) => {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app; // Use export default for ES6 modules