'use strict';

const Order = require('../models/orderSchema');

const { findByToken } = require('./userService');

// TODO - verificar melhor forma de serializar esses objetos
const renderCart = (cartModel) => {
  cartModel.owner = {
    _id: cartModel.owner._id,
    firstName: cartModel.owner.firstName,
    lastName: cartModel.owner.lastName,
  }
  return cartModel;
};

exports.getCurrent = async function(token) {
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
}
