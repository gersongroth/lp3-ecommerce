const mongoose = require('mongoose');

const { userSchema } = require('./userSchema');
const { commerceItemSchema } = require('./commerceItemSchema');
const { shippingSchema } = require('./shippingSchema'); 
const { paymentSchema } = require('./paymentSchema');

const orderSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ['INCOMPLETE', 'PENDING', 'PAID_WAITING_SHIP', 'PAID_WAITING_DELIVERY', 'INVOICED', 'CANCELED', 'CONCLUDED'],
    default: 'INCOMPLETE',
  },
  owner: Object,
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
  submittedDate: {
    type: Date,
  },
  commerceItems: [ commerceItemSchema ],
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
  },
  freight: {
    type: Number,
    default: 0,
  },
  subtotal: {
    type: Number,
    default: 0,
  },
  totalNumberOfItems: {
    type: Number,
    default: 0
  },
  numberOfDistinctProducts: {
    type: Number,
    default: 0
  },
  shippingGroups: [shippingSchema],
  paymentGroups: [paymentSchema],
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
