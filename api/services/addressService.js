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