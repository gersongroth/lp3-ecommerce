
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
  return res.json([{
    deliveryMethod: 'PAC',
    deliveryTime: 15,
    price: (Math.random()*30+15).toFixed(2),
    carrier: 'Correios',
    _id: 1,
    deliveryType: 'STANDARD'
  },
  {
    deliveryMethod: 'SEDEX',
    deliveryTime: 5,
    price: (Math.random()*50+30).toFixed(2),
    carrier: 'Correios',
    _id: 2,
    deliveryType: 'EXPRESS'
  },
  {
    deliveryMethod: 'TOTAL Standard',
    deliveryTime: 20,
    price: (Math.random()*20+10).toFixed(2),
    carrier: 'Total',
    _id: 3,
    deliveryType: 'STANDARD'
  }]);
};

exports.quoteShipping = quoteShipping;

