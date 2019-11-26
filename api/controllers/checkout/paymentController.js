
'use strict';

const {
  getCurrent,
} = require('../../services/cartService');
const {
  selectPayment,
} = require('../../services/checkout/paymentService')
const { getHeaderToken } = require('../../services/authService');

exports.selectPayment = async function(req, res, next) {
  const token = getHeaderToken(req);

  try {
    await selectPayment(token, req.body);
    // TODO - validar
    next();
  } catch(e) {
    console.error('[selectPayment] - Error', e);
    return res
      .status(400)
      .json({
        success: false,
        message: e.toString()
      });
  }
};
