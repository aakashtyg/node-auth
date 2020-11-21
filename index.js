const express = require('express');

const db = require('./config/mongoose');
const PORT = 8000;
const app = express();

app.use('/', require('./routes'));

app.listen(PORT, function (error) {
  if (error) console.log('error : ', error);

  console.log('Server is running!');
});