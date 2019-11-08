'use strict';

const User = require('../models/userSchema');
const { login } = require('../services/userService');
const moment = require('moment');

exports.login = async function(req, res) {
  const { username, password } = req.body;
  if(!username || !password) {
    res.send('Usuário e senha são obrigatórios');
  }

  const user = await login(username, password);
  console.log(user);


  res.json({
    teste: true,
  })
  /*User.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });*/
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