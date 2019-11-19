'use strict';

const Token = require('../models/tokenSchema');

const crypto = require('crypto')

exports.generateToken = async function() {
  const buffer = crypto.randomBytes(48);
  
  return buffer.toString('hex');
}

const findToken = async (token) => {
  return await Token.findOne({
    token,
  });
}

const findTokenFromRequest = async(req) => {
  const token = getHeaderToken(req);
  return await findToken(token);
}

const getHeaderToken = (req) => {
  return req.headers['x-access-token'];
}


const accessDenied = (res, message) => {
  return res
    .status(401)
    .send({
      message,
      auth: false,
    });
}

exports.getHeaderToken = getHeaderToken;

exports.getToken = async(token) => {
  return await findToken(token);
}

exports.validateToken = async function(req, res, next) {
  const headerToken = getHeaderToken(req);
  if (!headerToken){
    return accessDenied(res, 'Token é obrigatório.');
  } 
  const token = await findToken(headerToken);

  if(!token) {
    return accessDenied(res, 'Token é inválido.');
  }

  next();
}



exports.validateLoggedIn = async function(req, res, next) {
  //  TODO - centralizar
  const headerToken = getHeaderToken(req);
  if (!headerToken){
    return accessDenied(res, 'Token é obrigatório.');
  } 
  const token = await findToken(headerToken);

  if(!token) {
    return accessDenied(res, 'Token é inválido.');
  }

  if (!token.loggedIn) {
    return accessDenied(res, 'Usuário não está logado.');
  }

  next();
}

exports.userLoggedIn = async function(req, user) {
  const token = await findTokenFromRequest(req);

  return await Token.findOneAndUpdate({
    _id: token._id,
  },
  {
    $set: {
      userId: user._id,
      loggedIn: true,
    }
  })
}

exports.logout = async function(token) {
  return await (Token.findOneAndDelete({
    token: token,
  }));
}

