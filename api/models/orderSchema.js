const mongoose = require('mongoose');

const { userSchema } = require('./userSchema');

const orderSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ['INCOMPLETE', 'PENDING', 'PAID_WAITING_SHIP', 'PAID_WAITING_DELIVERY', 'INVOICED', 'CANCELED', 'CONCLUDED'],
    default: 'INCOMPLETE',
  },
  owner: userSchema,
  createdAt: {
    type: Date,
  },
  submittedDate: {
    type: Date,
  }
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
