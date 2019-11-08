'use strict';

const User = require('../models/userSchema');
const { getToken } = require('./authService');

exports.findByUsername = async function(username) {
  return await User.findOne({username});
}

exports.findByToken = async function(headerToken) {
  const token = await getToken(headerToken);
  if(!token || !token.userId) {
    return undefined;
  }
  
  return await User.findOne({
    _id: token.userId,
  });
}

exports.login = async function(username, password) {
  return await User.findOne({
    username,
    password,
  });
}