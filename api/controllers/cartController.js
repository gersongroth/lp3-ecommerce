
'use strict';

const {
  getCurrent,
  addItem,
  deleteItem,
  updateItem,
  getLastOrder,
} = require('../services/cartService');
const { getHeaderToken } = require('../services/authService');

exports.getCurrent = async function(req, res) {
  const token = getHeaderToken(req);

  const current = await getCurrent(token);
  return res
    .json(renderCart(current));
};

exports.getLastOrder = async function(req, res) {
  const token = getHeaderToken(req);

  const last = await getLastOrder(token);
  return res
    .json(renderCart(last));
};

exports.getItems = async function(req, res) {
  const token = getHeaderToken(req);

  const current = await getCurrent(token);
  const cartSerialized = renderCart(current);
  return res
    .json(cartSerialized.commerceItems);
}

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

const formatCardNumber = function(cardNumber) {
  if(cardNumber) {
    // TODO - not good
    return cardNumber.replace(/(\d*?)(\d{4})/, "************$1");
  }
  return '**** **** **** ****';
}

const renderPaymentGroup = (paymentGroup) => {
  return {
    numberOfInstallments: paymentGroup.numberOfInstallments,
    price: paymentGroup.price,
    country: paymentGroup.country,
    number: paymentGroup.number,
    neighborhood: paymentGroup.neighborhood,
    street: paymentGroup.street,
    complement: paymentGroup.complement,
    zipCode: paymentGroup.zipCode,
    phoneNumber: paymentGroup.phoneNumber,
    city: paymentGroup.city,
    cardNumber: formatCardNumber(paymentGroup.cardNumber),
    paymentMethod: paymentGroup.paymentType,
  };
};


const renderCart = (cartModel) => {
  if(!cartModel) {
    return {};
  }
  if(cartModel.owner.anonymous) {
    cartModel.owner = undefined;
  } else {
    cartModel.owner = {
      _id: cartModel.owner._id,
      firstName: cartModel.owner.firstName,
      lastName: cartModel.owner.lastName,
    }
  }
  
  cartModel.commerceItems = cartModel.commerceItems.map(renderCommerceItem);
  cartModel.paymentGroups = cartModel.paymentGroups.map(renderPaymentGroup);

  return cartModel;
};