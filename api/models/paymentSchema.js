const mongoose = require('mongoose');

const paymentPriceSchema = new mongoose.Schema({
  total: {
    type: Number,
    default: 0,
  }
});

const paymentSchema = new mongoose.Schema({
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
  price: paymentPriceSchema,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  paymentType: {
    type: String,
    required: [true, "Tipo do pagamento é obrigatório"]
  },
  numberOfInstallments: {
    type: Number,
    default: 1,
  },
  cardNumber: {
    type: String,
  },
  cardOwner: {
    type: String,
  },
  cardExpirationDate: {
    type: String,
  }
});

const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;
module.exports.paymentSchema = paymentSchema;
