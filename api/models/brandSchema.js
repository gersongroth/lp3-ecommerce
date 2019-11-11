const mongoose = require('mongoose');
const { imageSchema } = require('./imageSchema');

const brandSchema = new mongoose.Schema({
  description: {
    type: String,
    required: [true, 'Descrição é obrigatória'],
  },
  image: imageSchema,
  createdAt: {
    type: Date,
  }
});

const Brand = mongoose.model('Brand', brandSchema);
module.exports = Brand;
module.exports.brandSchema = brandSchema;
