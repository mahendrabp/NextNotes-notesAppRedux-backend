const express = require('express');
const categoryController = require('../controllers/categoryController');

const Router = express.Router();

// Request category_table
Router.get('/', categoryController.getCategory)
  .get('/:id', categoryController.getCategoryById)
  .post('/', categoryController.insertCategory)
  .patch('/:id', categoryController.updateCategory)
  .delete('/:id', categoryController.deleteCategory);

module.exports = Router;
