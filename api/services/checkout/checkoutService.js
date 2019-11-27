'use strict';

const Order = require('../../models/orderSchema');
const Payment = require('../../models/paymentSchema');

const { getCurrent } = require('../cartService');

const isPaymentMethodValid = async function(token, paymentMethod) {
  const availablePaymentMethods = await getAvailablePaymentMethods(token);
  // TODO - refatorar
  const isValid = availablePaymentMethods
    .filter((method) => method.paymentType === paymentMethod.paymentMethod)[0] !== undefined
  
  return isValid;
}

const finish = async function(token) {
  const order = await getCurrent(token);
  if(!order) {
    throw new Error('Pedido não existe!');
  }

  const shippingGroup = order.shippingGroups[0];

  if(!shippingGroup || !shippingGroup.price) {
    throw new Error('Você deve selecionar um endereço primeiro!');
  }

  const paymentGroup = order.paymentGroups[0];

  if(!paymentGroup || !paymentGroup.price) {
    throw new Error('Você deve selecionar um pagamento primeiro!');
  }

  // TODO - ao remover itens, se carrinho estiver vazio, remover pagamento
  // TODO - validar se valor do pedido é igual ao valor do pagamento

  order.set({
    status: 'PENDING',
    updatedAt: new Date(),
    submittedDate: new Date(),
  });

  await order.save();
};

exports.finish = finish;
