'use strict';
module.exports = function(app) {
  const user = require('../controllers/userController');
  const token = require('../controllers/tokenController');
  const address = require('../controllers/addressController');
  const category = require('../controllers/categoryController');
  const brand = require('../controllers/brandController');
  const product = require('../controllers/productController');
  const cart = require('../controllers/cartController');
  const price = require('../controllers/priceController');
  const newsletter = require('../controllers/newsletterController');
  const checkoutShipping = require('../controllers/checkout/shippingController');
  const checkoutPayment = require('../controllers/checkout/paymentController');
  const checkout = require('../controllers/checkout/checkoutController');
  const order = require('../controllers/orderController');

  const { validateToken, validateLoggedIn } = require('../services/authService');

  // TODO - organizar rotas

  /**
   * Cart
   */
  app.route('/cart')
    .get(validateToken, price.repriceOrder, cart.getCurrent);
  app.route('/cart/last')
    .get(validateToken, cart.getLastOrder);
  app.route('/cart/addItem')
    .post(validateToken, cart.addItem, price.repriceOrder, cart.getCurrent);
  app.route('/cart/deleteItem/:commerceItem')
    .delete(validateToken, cart.deleteItem, price.repriceOrder, cart.getCurrent);
  app.route('/cart/updateItem/:commerceItem')
    .patch(validateToken, cart.updateItem, price.repriceOrder, cart.getCurrent);
  app.route('/cart/items')
    .get(validateToken, price.repriceOrder, cart.getItems);

  /**
   * User
   */
  app.route('/login')
    .post(validateToken, user.login);
  app.route('/logout')
    .post(validateToken, validateLoggedIn, user.logout);
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
  
  /**
   * Catalog
   */
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

  /**
   * Token
   */
  app
    .route('/token/generate')
    .get(token.generate);

  /**
   * Newsletter
   */
  app.route('/newsletter')
    .post(newsletter.subscribe)
    .delete(newsletter.unsubscribe);

  /**
   * Checkout
   */
  app.route('/checkout/shipping/address')
    .put(validateToken, validateLoggedIn, checkoutShipping.selectAddress, price.repriceOrder, cart.getCurrent);
  app.route('/checkout/shipping/quote')
    .post(validateToken, validateLoggedIn, checkoutShipping.quoteShipping);
  app.route('/checkout/shipping/delivery')
    .put(validateToken, validateLoggedIn, checkoutShipping.selectDeliveryMethod, price.repriceOrder, cart.getCurrent);
  app.route('/checkout/shipping/cheapest')
    .put(validateToken, validateLoggedIn, checkoutShipping.selectCheapestMethod, price.repriceOrder, cart.getCurrent);

  app.route('/checkout/payment/select')
    .put(validateToken, validateLoggedIn, price.repriceOrder, checkoutPayment.selectPayment, cart.getCurrent);

  app.route('/checkout/finish')
    .post(validateToken, validateLoggedIn, price.repriceOrder, checkout.finish, cart.getLastOrder);

  app.route('/order')
    .get(validateToken, validateLoggedIn, order.getSubmittedOrders);

  app.route('/order/:id')
    .get(validateToken, validateLoggedIn, order.getOrder);

};