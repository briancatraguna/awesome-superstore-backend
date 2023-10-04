require('dotenv').config();

const express = require('express');

const app = express();

app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message;

  res.status(statusCode).json({message: message, errors: error.data});
  next();
});

app.listen(process.env.PORT);
