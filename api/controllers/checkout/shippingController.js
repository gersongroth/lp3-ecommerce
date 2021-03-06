
'use strict';

const {
  getCurrent,
} = require('../../services/cartService');
const {
  selectAddress,
  selectDeliveryMethod,
  getDeliveryMethods,
  selectCheapestMethod,
} = require('../../services/checkout/shippingService')
const { getHeaderToken } = require('../../services/authService');

exports.selectAddress = async function(req, res, next) {
  const token = getHeaderToken(req);

  try {
    await selectAddress(token, req.body);
    // TODO - validar
    next();
  } catch(e) {
    console.error('[selectAddress] - Error', e);
    return res
      .status(400)
      .json({
        success: false,
        message: e.toString()
      });
  }
};

const quoteShipping = async function(req, res) {
  const token = getHeaderToken(req);
  const cart = await getCurrent(token);
  
  let { zipCode } = req.body;
  if (!zipCode) {
    // TODO - utilizar forma melhor (Talvez um reduce?)
    zipCode = (cart.shippingGroups
      .filter((shippingGroup) => shippingGroup.zipCode)[0]
      || {}).zipCode;
  }

  if(!zipCode) {
    return res
      .status(400)
      .json({
        success: false,
        message: 'CEP é obrigatório'
      })
  }

  // TODO - criar cadastro de métodos de entrega ou utilizar serviço dos correios, por exemplo
  return res.json(getDeliveryMethods(token, zipCode));
};

exports.quoteShipping = quoteShipping;

exports.selectDeliveryMethod = async function(req, res, next) {
  const token = getHeaderToken(req);

  try {
    await selectDeliveryMethod(token, req.body);
    // TODO - validar
    next();
  } catch(e) {
    console.error('[selectDeliveryMethod] - Error', e);
    return res
      .status(400)
      .json({
        success: false,
        message: e.toString()
      });
  }
};

exports.selectCheapestMethod = async function(req, res, next) {
  const token = getHeaderToken(req);

  try {
    await selectCheapestMethod(token, req.body);
    // TODO - validar
    next();
  } catch(e) {
    console.error('[selectCheapestMethod] - Error', e);
    return res
      .status(400)
      .json({
        success: false,
        message: e.toString()
      });
  }
}