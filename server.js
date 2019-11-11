var express = require('express'),
  app = express(),
  port = process.env.PORT || 3300,
  mongoose = require('mongoose'),
  Cart = require('./api/models/ecommerceModel'),
  User = require('./api/models/userSchema'),
  bodyParser = require('body-parser');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://admin:C0nnect123@cluster0-jhe7l.mongodb.net/test?retryWrites=true&w=majority');

/*
new User({
  username: 'teste',
  password: 'aaa',
  legalDocument: '000000000'
}).save();
*/

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/ecommerceRoutes'); //importing route

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

routes(app); //register the route


app.listen(port);

console.log('Ecommerce RESTful API server started on: ' + port);



/*

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:<password>@cluster0-jhe7l.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});


*/