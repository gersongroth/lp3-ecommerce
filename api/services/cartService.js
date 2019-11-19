'use strict';

const Order = require('../models/orderSchema');
const CommerceItem = require('../models/commerceItemSchema');

const { findByToken } = require('./userService');
const { getProduct } = require('./productService');

// TODO - verificar melhor forma de serializar esses objetos

const renderCommerceItem = (commerceItem) => {
  const product = commerceItem.product || {};
  commerceItem.product = {
    _id: product._id,
    images: product.images,
    description: product.description,
    brand: product.brand,
  };

  return commerceItem;
};

const renderCart = (cartModel) => {
  cartModel.owner = {
    _id: cartModel.owner._id,
    firstName: cartModel.owner.firstName,
    lastName: cartModel.owner.lastName,
  }
  cartModel.commerceItems = cartModel.commerceItems.map(renderCommerceItem);
  return cartModel;
};

const getCurrent = async function(token) {
  const userModel = await findByToken(token);

  const lastCart = await Order.findOne({
    'owner._id': userModel._id,
    'status': 'INCOMPLETE',
  });

  if (lastCart) {
    return lastCart;
  }

  const newCartModel = new Order({
    owner: userModel,
    createdAt: new Date(),
  });
  const newCart = await newCartModel.save();

  return newCart;
};

const getCurrentSerialized = async function(token) {
  return renderCart(await getCurrent(token));
}

exports.getCurrent = getCurrentSerialized;

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
  const total = (unitPrice * amount).toFixed(2);
  const gross = (amount * product.listPrice).toFixed(2);
  const discount = (gross - total).toFixed(2);

  // TODO - criar calculadora de preço do item
  const newItem = new CommerceItem({
    product,
    amount,
    total,
    gross,
    discount,
    productId: item.productId,
    unit: unitPrice,
 });

  await Order.findOneAndUpdate(
    { _id: cart._id },
    { $push: { commerceItems: newItem } }
  );

  return calculateCart(token);
}

const calculateCart = async (token) => {
  const current = await getCurrent(token);

  const price = current.commerceItems.reduce((accumulator, item) => {
    return {
      total: accumulator.total + item.total,
      discount: accumulator.discount + item.discount,
      gross: accumulator.gross + item.gross,
    }
  }, {
    total: 0,
    discount: 0,
    gross: 0,
  });

  current.total = price.total.toFixed(2);
  current.discount = price.discount.toFixed(2);
  current.gross = price.gross.toFixed(2);

  await current.save();

  return renderCart(current);
}


