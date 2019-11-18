
'use strict';

const Order = require('../models/orderSchema');
const {
  getCurrent,
  addItem,
} = require('../services/cartService');
const { getHeaderToken } = require('../services/authService');

exports.getCurrentCart = async function(req, res) {
  const token = getHeaderToken(req);

  const current = await getCurrent(token);
  return res
    .json(current);
};

exports.addItem = async function(req, res) {
  const token = getHeaderToken(req);

  try {
    const cart = await addItem(token, req.body);
    return res
      .json(cart);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({
        success: false,
        message: "Não foi possível adicionar o item no seu carrinho. Por favor tente novamente...",
      })
  }
};