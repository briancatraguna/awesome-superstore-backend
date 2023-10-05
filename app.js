require('dotenv').config();

// import node packages
const express = require('express');
const bodyParser = require('body-parser');

// import routers
const authRouter = require('./routes/auth');

const app = express();

// global middleware
app.use(bodyParser.json());

// routers
app.use('/auth', authRouter);

app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message;

  res.status(statusCode).json({message: message, errors: error.data});
  next();
});

app.listen(process.env.PORT);
