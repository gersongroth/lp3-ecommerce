const mongoose = require('mongoose');

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
  amount: {
    type: Number,
    required: [true, 'Quantidade do item é obrigatória'],
  },
  unit: {
    type: Number,
    required: [true, 'Preço do item é obrigatório'],
  },
  total: {
    type: Number,
  },
  gross: {
    type: Number,
  },
  discount: {
    type: Number,
  }
});

const CommerceItem = mongoose.model('CommerceItem', commerceItemSchema);
module.exports = CommerceItem;
module.exports.commerceItemSchema = commerceItemSchema
