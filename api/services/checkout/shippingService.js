'use strict';

const Order = require('../../models/orderSchema');
const Shipping = require('../../models/shippingSchema');

const { getCurrent } = require('../cartService');

const selectAddress = async function(token, address) {
  const order = await getCurrent(token);
  if(!order) {
    // TODO - exception
    return;
  }

  const shipping = new Shipping(address);

  return await Order.findOneAndUpdate(
    { _id: order._id },
    { $set: { shippingGroups: [shipping] } }
  );
};

exports.selectAddress = selectAddress;
