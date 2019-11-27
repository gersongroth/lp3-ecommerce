
'use strict';

const {
  getSubmittedOrders,
} = require('../services/orderService');
const {
  renderCart,
} = require('./cartController');
const { getHeaderToken } = require('../services/authService');

exports.getSubmittedOrders = async function(req, res) {
  const token = getHeaderToken(req);
  const submittedOrders = (await getSubmittedOrders(token))
  const orders = submittedOrders.map((order) => renderCart(order));
  return res
    .json(orders);
};
