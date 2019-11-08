const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: [true, 'token é obrigatório'],
    unique: true
  },
  createdAt: {
    type: Date,
  },
  userId: {
    type: String,
  },
  cartId: {
    type: String,
  },
  loggedIn: {
    type: Boolean
  }
})

const Token = mongoose.model('Token', tokenSchema);
module.exports = Token;
