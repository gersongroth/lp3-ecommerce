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



/*

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://groth:<password>@cluster0-m1d5l.gcp.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});


*/