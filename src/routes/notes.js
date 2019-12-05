const express = require('express');
const notesController = require('../controllers/notesController');

const Router = express.Router();

// Request category_table
Router.get('/', notesController.getNote)
  .get('/:id', notesController.getNoteById)
  .post('/', notesController.insertNote)
  .patch('/:id', notesController.updateNote)
  .delete('/:id', notesController.deleteNote);

module.exports = Router;
