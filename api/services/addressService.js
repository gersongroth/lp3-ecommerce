'use strict';

const User = require('../models/userSchema');

const { findByToken } = require('./userService');

exports.addAddress = async function(token, address) {
  const userModel = await findByToken(token);

  return await User.findOneAndUpdate(
    { _id: userModel._id },
    { $push: { addresses: address } }
  )
}

// TODO - realizar consulta direto no banco, ao inves de pegar o user
exports.getLastAddress = async function(token) {
  const userModel = await findByToken(token);

  return userModel.addresses.slice(-1)[0];
}

exports.getAddresses = async function(token) {
  const userModel = await findByToken(token);

  return userModel.addresses;
}

exports.getAddress = async function(token, addressId) {
  const userModel = await findByToken(token);
  return userModel.addresses.id(addressId);
}

exports.updateAddress = async function(token, addressId, addressUpdate) {
  const userModel = await findByToken(token);
  const address = userModel.addresses.id(addressId);
  if(!address) {
    return;
  }
  address.set(addressUpdate);
  userModel.save();

  return address;
}

exports.removeAddress = async function(token, addressId) {
  const userModel = await findByToken(token);
  const address = userModel.addresses.id(addressId);
  if(!address) {
    return;
  }
  address.remove();
  userModel.save();

  return address;
}
