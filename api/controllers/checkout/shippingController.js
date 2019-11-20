
'use strict';

const Order = require('../../models/orderSchema');
const {
  getCurrent,
} = require('../../services/cartService');
const { selectAddress } = require('../../services/checkout/shippingService')
const { getHeaderToken } = require('../../services/authService');

exports.selectAddress = async function(req, res, next) {
  const token = getHeaderToken(req);

  await selectAddress(token, req.body);
  // TODO - validar
  next();
};
