const mongoose = require('mongoose');
const { productSchema } = require('./productSchema');
const commerceItemSchema = new mongoose.Schema({
  /*
  status: {
    type: String,
    enum: ['INCOMPLETE', 'PENDING', 'PAID_WAITING_SHIP', 'PAID_WAITING_DELIVERY', 'INVOICED', 'CANCELED', 'CONCLUDED'],
    default: 'INCOMPLETE',
  },
  */
  productId: {
    type: String,
    required: [true, 'Id do Produto é obrigatório'],
  },
  product: productSchema,
  amount: {
    type: Number,
    required: [true, 'Quantidade do item é obrigatória'],
    min: 1,
  },
  unit: {
    type: Number,
    default: 0,
  },
  total: {
    type: Number,
    default: 0,
  },
  gross: {
    type: Number,
    default: 0,
  },
  discount: {
    type: Number,
    default: 0,
  }
});

const CommerceItem = mongoose.model('CommerceItem', commerceItemSchema);
module.exports = CommerceItem;
module.exports.commerceItemSchema = commerceItemSchema
