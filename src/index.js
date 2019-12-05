const express = require('express');
const Route = express.Router();

// import each of Route
const categories = require('./routes/category');
const notes = require('./routes/notes');

// then route to this
Route.use('/api/v1/categories', categories);
Route.use('/api/v1/notes', notes);

Route.use('/', (req, res) => {
  res.send('halo');
});

//export
module.exports = Route;
