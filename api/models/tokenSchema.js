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
  user_id: {
    type: String,
  },
  cart_id: {
    type: String,
  },
  logged_in: {
    type: Boolean
  }
})

const Token = mongoose.model('Token', tokenSchema);
module.exports = Token;
