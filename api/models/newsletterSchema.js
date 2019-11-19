const mongoose = require('mongoose');

const newsletterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email é obrigatório'],
  },
  subscriptionDate: {
    type: Date,
    required: [true, 'Data de inscrição é obrigatória'],
  },
})

const Newsletter = mongoose.model('Newsletter', newsletterSchema);
module.exports = Newsletter;
