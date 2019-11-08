'use strict';
module.exports = function(app) {
  var ecommerce = require('../controllers/ecommerceController');
  var user = require('../controllers/userController');

  // todoList Routes
  app.route('/cart')
    .get(ecommerce.get_cart)
    .post(ecommerce.create_cart);

  app.route('/login')
    .post(user.login);
  app.route('/register')
    .post(user.register);

 /* app.route('/tasks/:taskId')
    .get(todoList.read_a_task)
    .put(todoList.update_a_task)
    .delete(todoList.delete_a_task);*/


    app.route('/test')
    .get(ecommerce.test);
};