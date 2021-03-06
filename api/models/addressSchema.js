const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  zipCode: {
    type: String,
    required: [true, 'CEP é obrigatório'],
  },
  description: {
    type: String,
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
  state: {
    type: String,
    required: [true, 'Estado é obrigatório'],
  },
  country: {
    type: String,
    required: [true, 'País é obrigatório'],
  },
  reference: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  }
});

const Address = mongoose.model('Address', addressSchema);
module.exports = Address;
module.exports.addressSchema = addressSchema;
