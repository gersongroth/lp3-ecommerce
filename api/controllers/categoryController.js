
'use strict';

const Category = require('../models/categorySchema');
const {
  getCategories,
  getCategory,
  updateCategory,
  removeCategory,
} = require('../services/categoryService');

exports.addCategory = async function(req, res) {
  const newCategory = new Category(req.body);
  newCategory.createdAt = new Date();

  newCategory.save(function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};

exports.getCategories = async function(req, res) {
  const categories = await getCategories(req.query.search || '');
  return res
    .json(categories);
};

exports.getCategory = async function(req, res) {
  const id = req.params.id;

  const category = await getCategory(id);
  
  if(category) {
    return res
      .json(category);
  } else {
    return res
      .status(404)
      .json({
        success: false,
        message: 'Categoria não encontrada.'
      });
  }
};

exports.updateCategory = async function(req, res) {
  const id = req.params.id;

  const success = await updateCategory(id, req.body);
  
  if(success) {
    const category = await getCategory(id);
    return res
      .json(category);
  } else {
    return res
      .status(404)
      .json({
        success: false,
        message: 'Categoria não encontrada.'
      });
  }
};

exports.removeCategory = async function(req, res) {
  const id = req.params.id;

  const category = await removeCategory(id);
  
  if(category) {
    return res
      .json({
        success: true,
        message: 'Categoria removida com sucesso',
      });
  } else {
    return res
      .status(404)
      .json({
        success: false,
        message: 'Categoria não encontrada.'
      });
  }
};