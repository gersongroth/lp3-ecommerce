
'use strict';

const {
  finish,
} = require('../../services/checkout/checkoutService')
const { getHeaderToken } = require('../../services/authService');

exports.finish = async function(req, res, next) {
  const token = getHeaderToken(req);

  try {
    await finish(token, req.body);
    // TODO - validar
    next();
  } catch(e) {
    console.error('[finish] - Error', e);
    return res
      .status(400)
      .json({
        success: false,
        message: e.toString()
      });
  }
};
