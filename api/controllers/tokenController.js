'use strict';

const Token = require('../models/tokenSchema');

const { generateToken } = require('../services/authService');


exports.generate = async function(req, res) {
  
  const token = await generateToken();
  
  var new_token = new Token({
    token,
    createdAt: new Date(),
    user_id: undefined,
    cart_id: undefined, // TODO criar carrinho pra cada novo token
  });

  new_token.save(function(err) {
    if (err) {
      res
        .status(500)
        .json({
          success: false,
          message: 'Erro interno'
      });
      return;
    }
    res.json({
      token,
    });
  });
};
/*
exports.register = async function(req, res) {
  var new_user = new User(req.body);
  new_user.birthday = moment(req.body.birthday, "DD/MM/YYYY").toDate();
  new_user.createdAt = new Date();

  new_user.save(function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};*/
