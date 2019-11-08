'use strict';

const User = require('../models/userSchema');
const { getToken } = require('./authService');
const moment = require('moment');

exports.findByUsername = async function(username) {
  return await User.findOne({username});
}

const findByToken = async function(headerToken) {
  const token = await getToken(headerToken);
  if(!token || !token.userId) {
    return undefined;
  }
  
  return await User.findOne({
    _id: token.userId,
  });
}

exports.findByToken = findByToken;

exports.login = async function(username, password) {
  return await User.findOne({
    username,
    password,
  });
}

exports.updateUser = async function(token, user) {
  const userModel = await findByToken(token);
  const update = {
    birthday: moment(user.birthday, 'DD/MM/YYYY').toDate(),
    firstName: user.firstName,
    lastName: user.lastName,
    cellPhone: user.cellPhone,
    identityDocument: user.identityDocument,
    genre: user.genre,
  };

  return await User.findOneAndUpdate(
    { _id: userModel._id },
    { $set: update }
  )
}


