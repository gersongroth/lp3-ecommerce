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

exports.validateToken = async function(req, res, next) {
  const headerToken = req.headers['x-access-token'];
  if (!headerToken){
    return res
            .status(401)
            .send({
              auth: false,
              message: 'No token provided.'
            });
  } 
  const token = await findToken(headerToken);

  if(!token) {
    return res
            .status(401)
            .send({
              auth: false,
              message: 'Token is invalid.'
            });
  }

  /*
  jwt.verify(token, process.env.SECRET, function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    
    // se tudo estiver ok, salva no request para uso posterior
    req.userId = decoded.id;
    next();
  });
  */

  next();
}
