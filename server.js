var express = require('express'),
  app = express(),
  port = process.env.PORT || 3300,
  mongoose = require('mongoose'),
  Cart = require('./api/models/ecommerceModel'),
  bodyParser = require('body-parser');
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/ecommerce'); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/ecommerceRoutes'); //importing route
routes(app); //register the route


app.listen(port);

console.log('Ecommerce RESTful API server started on: ' + port);
