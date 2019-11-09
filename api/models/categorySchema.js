const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  description: {
    type: String,
    required: [true, 'Descrição é obrigatória'],
  },
  longDescription: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
  children: {
    type: Array,
  },
  createdAt: {
    type: Date,
  }
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
