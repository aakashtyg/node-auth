const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cn-node-auth');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'error in connectiing to DB'));


db.once('open', function () {
  console.log('Successfully connected to database :: MongoDB');
});

module.exports = db;