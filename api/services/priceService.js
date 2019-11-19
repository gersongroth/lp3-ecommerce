'use strict';

const { getProduct } = require('./productService');
const { getCurrent } = require('./cartService');

const calculateCart = async (token) => {
  const current = await getCurrent(token);

  const price = current.commerceItems.reduce((accumulator, item) => {
    return {
      total: accumulator.total + item.total,
      discount: accumulator.discount + item.discount,
      gross: accumulator.gross + item.gross,
      totalItens: accumulator.totalItens + item.amount,
    }
  }, {
    total: 0,
    discount: 0,
    gross: 0,
    totalItens: 0,
  });

  current.total = price.total.toFixed(2);
  current.discount = price.discount.toFixed(2);
  current.gross = price.gross.toFixed(2);
  current.totalNumberOfItems = price.totalItens;
  current.numberOfDistinctProducts = current.commerceItems.length;

  await current.save();

  return current;
}

const calculateCommerceItemPrice = (item, product) => {
  const unitPrice = product.salePrice ? product.salePrice : product.listPrice;
  const amount = item.amount || 1;
  const total = (unitPrice * amount).toFixed(2);
  const gross = (amount * product.listPrice).toFixed(2);
  const discount = (gross - total).toFixed(2);

  // TODO - criar calculadora de preço do item
  return {
    total,
    gross,
    discount,
    unit: unitPrice,
  };
}

const repriceCommerceItems = async (cart) => {
  const commerceItems = cart.commerceItems;
  for (const commerceItem of commerceItems) {
    await repriceCommerceItem(cart, commerceItem._id)
  }
  
  cart.save();
}

const repriceCommerceItem = async (cart, commerceItemId) => {
  const commerceItem = cart.commerceItems.id(commerceItemId)
  const product = await getProduct(commerceItem.product._id);
  if(!product) {
    // TODO - remover itens excluidos ou sem estoque
    throw new Error('Produto não encontrado!')
  }
  const updateItem = calculateCommerceItemPrice(commerceItem, product);
  await commerceItem.set(updateItem);
}

exports.repriceOrder = async function(token) {
  const cart = await getCurrent(token);

  await repriceCommerceItems(cart);
  await calculateCart(token);
}
