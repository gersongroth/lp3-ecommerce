'use strict';


var mongoose = require('mongoose'),
  Cart = mongoose.model('Cart');

exports.get_cart = function(req, res) {
  Cart.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.create_cart = function(req, res) {
  var new_cart = new Cart(req.body);
  new_cart.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.test = function(req, res) {
  //if (err)
  //  res.send(err);
  res.json({'success': true});
};

/*
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