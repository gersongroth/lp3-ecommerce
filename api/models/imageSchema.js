const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: [true, 'URL é obrigatória'],
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
  }
});

const Image = mongoose.model('Image', imageSchema);
module.exports = Image;
module.exports.imageSchema = imageSchema;
