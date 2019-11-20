'use strict';

const User = require('../models/userSchema');
const { getToken, userLoggedIn } = require('./authService');
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

const generateRandomPassword = () => {
  return Math.random().toString(36).substring(2, 15) 
       + Math.random().toString(36).substring(2, 15);
}

exports.getAnonymousUser = async function(token) {
  const user = await User.findOne({
    username: token,
    anonymous: true,
  });

  if(user) {
    return user;
  }

  const newAnonymousUser = new User({
    username: token,
    email: `${token}@uricer.edu.br`,
    createdAt: new Date(),
    password: generateRandomPassword(),
    legalDocument: '--------------',
    anonymous: true,
  });

  const anonymous = await newAnonymousUser.save();
  await userLoggedIn(token, anonymous);

  return anonymous;
}

exports.findByToken = findByToken;

exports.login = async function(username, password) {
  const userWithUsername = await User.findOne({
    username,
    password,
    anonymous: false,
  });
  if(userWithUsername) {
    return userWithUsername;
  }
  const userWithLegalDocument = await User.findOne({
    password,
    legalDocument: username,
  });
  if(userWithLegalDocument) {
    return userWithLegalDocument;
  }

  return await User.findOne({
    password,
    email: username,
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
    email: user.email,
  };

  return await User.findOneAndUpdate(
    { _id: userModel._id },
    { $set: update }
  )
}
