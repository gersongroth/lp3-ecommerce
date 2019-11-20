'use strict';

const Order = require('../models/orderSchema');
const CommerceItem = require('../models/commerceItemSchema');

const { findByToken, getAnonymousUser } = require('./userService');
const { getProduct } = require('./productService');

// TODO - verificar melhor forma de serializar esses objetos
const getCurrent = async function(token) {
  let userModel = await findByToken(token);
  if(!userModel) {
    userModel = await getAnonymousUser(token);
  }

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

exports.getCurrent = getCurrent;

exports.addItem = async function(token, item) {
  const cart = await getCurrent(token);

  // TODO - separar conceitos em sku e produto
  const product =  await getProduct(item.productId);

  if(!product) {
    throw new Error('Produto não encontrado!');
  }

  const newItem = new CommerceItem({
    product,
    productId: item.productId,
    amount: item.amount,
  });

  return await Order.findOneAndUpdate(
    { _id: cart._id },
    { $push: { commerceItems: newItem } }
  );
}

exports.deleteItem = async function(token, itemId) {
  const cart = await getCurrent(token);
  const item = cart.commerceItems.id(itemId);

  if(!item) {
    throw new Error('Item não encontrado');
  }

  item.remove();
  cart.save();

  return item;
}

exports.updateItem = async function(token, commerceItemId, item) {
  const cart = await getCurrent(token);
  const itemModel = cart.commerceItems.id(commerceItemId);

  if(!itemModel) {
    throw new Error('Item não encontrado')
  }

  const product =  await getProduct(itemModel.productId);
  if(!product) {
    throw new Error('Produto não encontrado!');
  }

  itemModel.set({
    amount: item.amount
  });

  await cart.save();

  return itemModel;
}
