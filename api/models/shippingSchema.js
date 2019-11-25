const mongoose = require('mongoose');

const shippingPriceSchema = new mongoose.Schema({
  total: {
    type: Number,
    default: 0,
  },
  // TODO - adicionar opções de desconto de frete
});

const shippingSchema = new mongoose.Schema({
  zipCode: {
    type: String,
    required: [true, 'CEP é obrigatório'],
  },
  street: {
    type: String,
    required: [true, 'Rua é obrigatório'],
  },
  number: {
    type: String,
    required: [true, 'Número é obrigatório'],
  },
  complement: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  neighborhood: {
    type: String,
    required: [true, 'Bairro é obrigatório'],
  },
  city: {
    type: String,
    required: [true, 'Cidade é obrigatória'],
  },
  country: {
    type: String,
    required: [true, 'País é obrigatório'],
  },
  reference: {
    type: String,
  },
  receiverName: {
    type: String,
  },
  price: shippingPriceSchema,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  deliveryMethodId: {
    type: String,
  },
  deliveryMethod: {
    type: String,
  },
  carrier: {
    type: String,
  }
});

const Shipping = mongoose.model('Shipping', shippingSchema);
module.exports = Shipping;
module.exports.shippingSchema = shippingSchema;
