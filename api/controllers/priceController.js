
'use strict';

const {
  repriceOrder,
} = require('../services/priceService');
const { getHeaderToken } = require('../services/authService');

exports.repriceOrder = async function(req, res, next) {
  const token = getHeaderToken(req);

  try {
    await repriceOrder(token);
    next();
  } catch(e) {
    console.error('Error repricing cart', e);
    return res
      .status(500)
      .json({
        success: false,
        messagem: 'Erro ao recalcular carrinho',
      });
  }
};
