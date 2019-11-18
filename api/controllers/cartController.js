
'use strict';

const Order = require('../models/orderSchema');
const {
  getCurrent,
} = require('../services/cartService');
const { getHeaderToken } = require('../services/authService');

exports.getCurrentCart = async function(req, res) {
  const token = getHeaderToken(req);

  const current = await getCurrent(token);
  return res
    .json(current);
};