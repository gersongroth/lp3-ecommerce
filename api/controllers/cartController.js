
'use strict';

const Order = require('../models/orderSchema');
const {
  getCurrent,
  addItem,
  deleteItem,
  updateItem,
} = require('../services/cartService');
const { getHeaderToken } = require('../services/authService');

exports.getCurrent = async function(req, res) {
  const token = getHeaderToken(req);

  const current = await getCurrent(token);
  return res
    .json(renderCart(current));
};

exports.addItem = async function(req, res, next) {
  const token = getHeaderToken(req);

  try {
    await addItem(token, req.body);
    next();
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({
        success: false,
        message: "Não foi possível adicionar o item no seu carrinho. Por favor tente novamente...",
      })
  }
};

exports.deleteItem = async function(req, res, next) {
  const token = getHeaderToken(req);
  const commerceItemId = req.params.commerceItem;
  try {
    await deleteItem(token, commerceItemId);
    next();
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({
        success: false,
        message: "Não foi possível remover o item do seu carrinho. Por favor tente novamente...",
      })
  }
};

exports.updateItem = async function(req, res, next) {
  const token = getHeaderToken(req);
  const commerceItemId = req.params.commerceItem;
  try {
    await updateItem(token, commerceItemId, req.body);
    next();
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({
        success: false,
        message: "Não foi possível atualizar o item no seu carrinho. Por favor tente novamente...",
      })
  }
};


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