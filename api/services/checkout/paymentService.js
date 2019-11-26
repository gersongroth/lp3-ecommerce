'use strict';

const Order = require('../../models/orderSchema');
const Payment = require('../../models/paymentSchema');

const { getCurrent } = require('../cartService');

const getAvailablePaymentMethods = async function(token) {
  return [
    {
      paymentType: 'boleto',
      description: 'Boleto',
    },
    {
      paymentType: 'creditCard',
      description: 'Cartão de Crédito',
    }
  ];
}

const isPaymentMethodValid = async function(token, paymentMethod) {
  const availablePaymentMethods = await getAvailablePaymentMethods(token);
  // TODO - refatorar
  const isValid = availablePaymentMethods
    .filter((method) => method.paymentType === paymentMethod.paymentMethod)[0] !== undefined
  
  return isValid;
}

const selectPayment = async function(token, paymentMethod) {
  const order = await getCurrent(token);
  if(!order) {
    throw new Error('Pedido não existe!');
  }

  const shippingGroup = order.shippingGroups[0];

  if(!shippingGroup || !shippingGroup.price) {
    throw new Error('Você deve selecionar um endereço primeiro!');
  }

  if(!(await isPaymentMethodValid(token, paymentMethod))) {
    throw new Error('Tipo de pagamento é inválido!');
  }

  // TODO - validar pagamento
  // CVV, expirationDate...

  const payment = new Payment({
    paymentType: paymentMethod.paymentMethod,
    price: {
      total: order.total,
    },
    country: shippingGroup.country,
    number: shippingGroup.number,
    neighborhood: shippingGroup.neighborhood,
    street: shippingGroup.street,
    complement: shippingGroup.complement,
    zipCode: shippingGroup.zipCode,
    phoneNumber: shippingGroup.phoneNumber,
    city: shippingGroup.city,
    numberOfInstallments: paymentMethod.numberOfInstallments,
    cardNumber: paymentMethod.cardNumber,
    cardOwner: paymentMethod.cardOwner,
    cardExpirationDate: paymentMethod.cardExpirationDate,
  });
  return await Order.findOneAndUpdate(
    { _id: order._id },
    { $set: { paymentGroups: [payment] } }
  );
};

exports.selectPayment = selectPayment;
exports.getAvailablePaymentMethods = getAvailablePaymentMethods;
