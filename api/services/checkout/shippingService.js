'use strict';

const Order = require('../../models/orderSchema');
const Shipping = require('../../models/shippingSchema');

const { getCurrent } = require('../cartService');

const selectAddress = async function(token, address) {
  const order = await getCurrent(token);
  if(!order) {
    throw new Error('Pedido não existe!');
  }

  const shipping = new Shipping(address);

  return await Order.findOneAndUpdate(
    { _id: order._id },
    { $set: { shippingGroups: [shipping] } }
  );
};

const selectDeliveryMethod = async function(token, deliveryMethod) {
  const order = await getCurrent(token);
  if(!order) {
    throw new Error('Pedido não existe!');
  }

  const shippingGroupId = (order.shippingGroups[0] || {})._id;

  if(!shippingGroupId) {
    throw new Error('Nenhum endereço selecionado');
  }

  const deliveryMethodId = deliveryMethod.id || deliveryMethod._id;
  const shippingGroup = order.shippingGroups.id(shippingGroupId);

  const deliveryMethodQuote = (await getDeliveryMethods(token, shippingGroup.zipCode))
    .filter((delivery) => delivery._id == deliveryMethodId)[0];

  if(!deliveryMethodQuote) {
    throw new Error('Método de entrega não encontrado');
  }

  await shippingGroup.set({
    deliveryMethodId: deliveryMethodId,
    deliveryMethod: deliveryMethodQuote.deliveryMethod,
    carrier: deliveryMethodQuote.carrier,
    price: {
      total: +deliveryMethodQuote.price
    },
    deliveryType: deliveryMethodQuote.deliveryType,
    deliveryTime: deliveryMethodQuote.deliveryTime,
    updatedAt: new Date(),
  });

  await order.save();
};

const getDeliveryMethods = async function(token, zipCode) {
  // TODO - utilizar token e zipCode
  return [{
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
  }];
}

const selectCheapestMethod = async function(token, address) {
  await selectAddress(token, address);
  const deliveryMethods = await getDeliveryMethods();
  const deliveryMethod = deliveryMethods.sort((a,b) => +a.price - +b.price)[0];
  await selectDeliveryMethod(token, deliveryMethod);
}

exports.selectAddress = selectAddress;
exports.selectDeliveryMethod = selectDeliveryMethod;
exports.getDeliveryMethods = getDeliveryMethods;
exports.selectCheapestMethod = selectCheapestMethod;
