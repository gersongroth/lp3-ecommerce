'use strict';

const Product = require('../models/productSchema');

exports.getProducts = async function(term) {
  return Product.find( { $or:
    [
      { "description": { "$regex": term, "$options": "i" } },
      { "longDescription": { "$regex": term, "$options": "i" } },
      { "brand.description": { "$regex": term, "$options": "i" }},
    ]}); 
}

exports.getProduct = async function(productId) {
  try {
    return await Product.findById(productId);
  } catch(e) {
    console.error('Erro buscando produto', e);
  }
}

exports.updateProduct = async function(productId, productUpdate) {
  try {
    return await Product.findByIdAndUpdate(productId, productUpdate);
  } catch(e) {
    console.error('Erro atualizando produto', e);
  }
}

exports.removeProduct = async function(productId) {
  try {
    return await Product.findByIdAndRemove(productId);
  } catch(e) {
    console.error('Erro removendo produto', e);
  }
}

exports.getProductNews = async function() {
  try {
    return await Product
      .find()
      .sort({'createdAt': -1})
      .limit(10);
  } catch(e) {
    console.error('Erro buscando produto', e);
  }
}

exports.getProductBestSellers = async function() {
  try {
    // TODO - retornar a partir dos pedidos
    return await Product
      .find({})
      .limit(10);
  } catch(e) {
    console.error('Erro buscando produto', e);
  }
}