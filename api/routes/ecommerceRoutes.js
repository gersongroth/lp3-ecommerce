'use strict';
module.exports = function(app) {
  const ecommerce = require('../controllers/ecommerceController');
  const user = require('../controllers/userController');
  const token = require('../controllers/tokenController');
  const { validateToken } = require('../services/tokenService');

  // todoList Routes
  app.route('/cart')
    .get(ecommerce.get_cart)
    .post(ecommerce.create_cart);

  app.route('/login')
    .post(validateToken, user.login);
  app.route('/register')
    .post(user.register);

 /* app.route('/tasks/:taskId')
    .get(todoList.read_a_task)
    .put(todoList.update_a_task)
    .delete(todoList.delete_a_task);*/


  app
    .route('/token/generate')
    .get(token.generate);

    app.route('/test')
    .get(ecommerce.test);
};