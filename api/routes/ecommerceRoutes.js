'use strict';
module.exports = function(app) {
  const ecommerce = require('../controllers/ecommerceController');
  const user = require('../controllers/userController');
  const token = require('../controllers/tokenController');
  const address = require('../controllers/addressController');
  const category = require('../controllers/categoryController');

  const { validateToken, validateLoggedIn } = require('../services/authService');

  // todoList Routes
  app.route('/cart')
    .get(ecommerce.get_cart)
    .post(ecommerce.create_cart);

  app.route('/login')
    .post(validateToken, user.login);
  app.route('/register')
    .post(validateToken, user.register);
  app.route('/user')
    .get(validateToken, validateLoggedIn, user.getUser)
    .patch(validateToken, validateLoggedIn, user.updateUser);

  app.route('/address')
    .post(validateToken, validateLoggedIn, address.addAddress)
    .get(validateToken, validateLoggedIn, address.getAddresses)
  app.route('/address/:id')
    .get(validateToken, validateLoggedIn, address.getAddress)
    .put(validateToken, validateLoggedIn, address.updateAddress)
    .delete(validateToken, validateLoggedIn, address.removeAddress)
  
  app.route('/category')
    .post(category.addCategory)
    .get(category.getCategories)

  app.route('/category/:id')
    .get(category.getCategory)
    .put(category.updateCategory)
    .delete(category.removeCategory)

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