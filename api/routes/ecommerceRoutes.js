'use strict';
module.exports = function(app) {
  const ecommerce = require('../controllers/ecommerceController');
  const user = require('../controllers/userController');
  const token = require('../controllers/tokenController');
  const address = require('../controllers/addressController');
  const category = require('../controllers/categoryController');
  const brand = require('../controllers/brandController');
  const product = require('../controllers/productController');
  const cart = require('../controllers/cartController');


  const { validateToken, validateLoggedIn } = require('../services/authService');

  // todoList Routes
  app.route('/cart')
    .get(cart.getCurrentCart);

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
  
  app.route('/brand')
    .post(brand.addBrand)
    .get(brand.getBrands)

  app.route('/brand/:id')
    .get(brand.getBrand)
    .put(brand.updateBrand)
    .delete(brand.removeBrand)

  app.route('/product')
    .post(product.addProduct)
    .get(product.getProducts)

  app.route('/product/:id')
    .get(product.getProduct)
    .put(product.updateProduct)
    .delete(product.removeProduct)

  app.route('/products/news')
    .get(product.getProductNews);
  app.route('/products/bestsellers')
    .get(product.getProductBestSellers);

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