'use strict';

const User = require('../models/userSchema');
const { login, findByToken } = require('../services/userService');
const { getHeaderToken, userLoggedIn } = require('../services/authService');
const moment = require('moment');

const serializeUser = (user) => {
  return {
    username: user.username,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    cellPhone: user.cellPhone,
    identityDocument: user.identityDocument,
    legalDocument: user.legalDocument,
    genre: user.genre,
    birthday: moment(user.birthday).format('DD/MM/YYYY'),
  }
}

exports.login = async function(req, res) {
  const { username, password } = req.body;
  if(!username || !password) {
    res
      .status(400)
      .send('[LOGIN] Usuário e senha são obrigatórios');
    return;
  }

  const user = await login(username, password);


  if(user){
    console.log(`[LOGIN] Usuário ${user.username} realizou login com sucesso.`)

    const success = userLoggedIn(req, user);
    if(!success) {
      return res
        .status(500)
        .json({
          success: false,
          message: 'Erro interno no servidor',
        })
    }

    res.json(serializeUser(user));
  } else {
    console.log(`[LOGIN] Falha no login do usuário ${user.username}.`)
    res
      .status(401)
      .json({
        success: false,
        message: 'Usuário ou senha incorretos'
    });
  }
};

exports.register = async function(req, res) {
  var new_user = new User(req.body);
  new_user.birthday = moment(req.body.birthday, "DD/MM/YYYY").toDate();
  new_user.createdAt = new Date();

  new_user.save(function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};

exports.getUser = async function(req, res) {
  const token = getHeaderToken(req);
  const user = await findByToken(token);

  if (!user) {
    return res
      .status(400)
      .json({
      success: false,
      message: 'Usuário não encontrado'
    });
  }

  return res.json(serializeUser(user));
}


/*
exports.create_cart = function(req, res) {
  var new_cart = new Cart(req.body);
  new_cart.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.read_a_task = function(req, res) {
  Task.findById(req.params.taskId, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.update_a_task = function(req, res) {
  Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.delete_a_task = function(req, res) {


  Task.remove({
    _id: req.params.taskId
  }, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};
*/