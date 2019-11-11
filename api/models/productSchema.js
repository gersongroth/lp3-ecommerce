const mongoose = require('mongoose');
const { imageSchema } = require('./imageSchema');
const { brandSchema } = require('./brandSchema');
const { categorySchema } = require('./categorySchema');

const productSchema = new mongoose.Schema({
  description: {
    type: String,
    required: [true, 'Descrição é obrigatória'],
  },
  longDescription: {
    type: String,
  },
  images: {
    type: [imageSchema],
    required: [true, 'O produto deve possuir ao menos uma imagem']
  },
  createdAt: {
    type: Date,
  },
  releaseDate: {
    type: Date,
  },
  brand: {
    type: brandSchema,
    required: [true, 'Marca é obrigatória']
  },
  parentCategories: [categorySchema],
  listPrice: {
    type: Number,
    required: [true, 'Preço é obrigatório'],
  },
  salePrice: {
    type: Number,
  },
  color: {
    type: String,
  },
  size: {
    type: String,
  },
  stock: {
    type: Number,
    required: [true, 'Estoque é obrigatório']
  }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
