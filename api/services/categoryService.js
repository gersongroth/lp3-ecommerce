'use strict';

const Category = require('../models/categorySchema');

exports.getCategories = async function(term) {
  return Category.find( { $or:
    [
      { "description": { "$regex": term, "$options": "i" } },
      { "longDescription": { "$regex": term, "$options": "i" } },
    ]}); 
}

exports.getCategory = async function(categoryId) {
  try {
    return await Category.findById(categoryId);
  } catch(e) {
    console.error('Erro buscando categoria', e);
  }
}

exports.updateCategory = async function(categoryId, categoryUpdate) {
  try {
    const update = {
      description: categoryUpdate.description,
      longDescription: categoryUpdate.longDescription,
    }
    return await Category.findByIdAndUpdate(categoryId, update);
  } catch(e) {
    console.error('Erro atualizando categoria', e);
  }
}

exports.removeCategory = async function(categoryId) {
  try {
    return await Category.findByIdAndRemove(categoryId);
  } catch(e) {
    console.error('Erro removendo categoria', e);
  }
}
