'use strict';

const Order = require('../models/orderSchema');
const CommerceItem = require('../models/commerceItemSchema');

const { findByToken } = require('./userService');
const { getProduct } = require('./productService');

// TODO - verificar melhor forma de serializar esses objetos
const renderCart = (cartModel) => {
  cartModel.owner = {
    _id: cartModel.owner._id,
    firstName: cartModel.owner.firstName,
    lastName: cartModel.owner.lastName,
  }
  return cartModel;
};

const getCurrent = async function(token) {
  const userModel = await findByToken(token);

  const lastCart = await Order.findOne({
    'owner._id': userModel._id,
    'status': 'INCOMPLETE',
  });

  if (lastCart) {
    return renderCart(lastCart);
  }

  const newCartModel = new Order({
    owner: userModel,
    createdAt: new Date(),
  });
  console.log('teste')
  const newCart = await newCartModel.save();
  console.log(newCart);

  return renderCart(newCart);
};

exports.getCurrent = getCurrent;

const errorMessage = (message) => {
  return {
    message,
    success: false,
  }
}

exports.addItem = async function(token, item) {
  const cart = await getCurrent(token);

  // TODO - separar conceitos em sku e produto
  const product =  await getProduct(item.productId);

  if(!product) {
    return errorMessage('Produto não encontrado!')
  }
  
  const unitPrice = product.salePrice ? product.salePrice : product.listPrice;
  const amount = item.amount || 1;
  const total = unitPrice * amount;
  const gross = amount * product.listPrice;
  const discount = gross - total;

  // TODO - criar calculadora de preço do item
  const newItem = new CommerceItem({
    amount,
    total,
    gross,
    discount,
    productId: item.productId,
    unit: unitPrice,
 });

  const cartUpdated = await Order.findOneAndUpdate(
    { _id: cart._id },
    { $push: { commerceItems: newItem } }
  );

  return renderCart(cartUpdated);
}


