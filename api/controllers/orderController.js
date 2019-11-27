
'use strict';

const {
  getSubmittedOrders,
  getOrder,
} = require('../services/orderService');
const {
  renderCart,
} = require('./cartController');
const { getHeaderToken } = require('../services/authService');

exports.getSubmittedOrders = async function(req, res) {
  const token = getHeaderToken(req);

  const submittedOrders = (await getSubmittedOrders(token))
  const orders = submittedOrders.map(renderCart);
  return res
    .json(orders);
};

exports.getOrder = async function(req, res) {
  const token = getHeaderToken(req);
  const id = req.params.id;
  const order = await getOrder(token,id);

  if(order) {
    return res
    .json(renderCart(order));
  }

  return res
    .status(404)
    .json({
      success: false,
      message: 'Order não encontrada',
    });  
};

