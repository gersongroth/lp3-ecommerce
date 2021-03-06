'use strict';

const User = require('../models/userSchema');
const { login, findByToken, updateUser, findUserById } = require('../services/userService');
const { getHeaderToken, userLoggedIn, logout, getToken } = require('../services/authService');
const { mergeOrdersFromAnonymousUser } = require('../services/orderService');
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

const isAnonymousUser = (token) => {
  return token && token.userId && !token.loggedIn;
}

// TODO - melhorar processo de login

exports.login = async function(req, res) {
  const { username, password } = req.body;
  if(!username || !password) {
    res
      .status(400)
      .json({
        success: false,
        message: 'Usuário e senha são obrigatórios'
      });
    return;
  }

  const user = await login(username, password);

  if(user){
    console.log(`[LOGIN] Usuário ${user.username} realizou login com sucesso.`)

    const token = await getToken(getHeaderToken(req));
    if (isAnonymousUser(token)) {
      await mergeOrdersFromAnonymousUser(await findUserById(token.userId), user);
    }
    const success = userLoggedIn(getHeaderToken(req), user);
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
    console.log(`[LOGIN] Falha no login do usuário ${username}.`)
    res
      .status(401)
      .json({
        success: false,
        message: 'Usuário ou senha incorretos'
    });
  }
};

exports.register = async function(req, res) {
  const newUser = new User(req.body);
  let birthday = undefined;
  if(moment(req.body.birthday, "DD/MM/YYYY").isValid()) {
    birthday = moment(req.body.birthday, "DD/MM/YYYY").toDate();
  } else {
    birthday = moment(req.body.birthday).toDate();
  }

  newUser.birthday = birthday;
  newUser.createdAt = new Date();

  newUser.save(function(err, user) {
    if (err) {
      return res
        .status(400)
        .json({
          success: false,
          message: err,
        });
    }
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

exports.updateUser = async function(req, res) {
  const token = getHeaderToken(req);

  const updated = await updateUser(token, req.body);
  if(updated) {
    const updatedUser = await findByToken(token);
    return res.json(serializeUser(updatedUser));
  } else {
    return res
      .status(500)
      .json({
        success: false,
        message: 'Erro atualizando usuário',
      })
  }

}

exports.logout = async function(req, res) {
  const token = getHeaderToken(req);
  try {
    await logout(token);
    return res.json({
      success: true,
    });
  } catch(e) {
    console.error('Erro removendo token', e);
  }
  return res
    .status(500)
    .json({
      success: false,
      message: 'Não foi possível realizar logout'
    })
};
 

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