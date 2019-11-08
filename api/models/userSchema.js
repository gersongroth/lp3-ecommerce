const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username é obrigatório'],
    unique: true
  },
  createdAt: {
    type: Date,
  },
  password: {
    type: String,
    required: [true, 'Senha é obrigatória']
  },
  email: {
    type: String,
    required: [true, 'Email é obrigatória'],
    unique: true
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  cellPhone: {
    type: String,
  },
  identityDocument: {
    type: String,
  },
  legalDocument: {
    type: String,
    required: [true, 'CPF é obrigatório'],
    unique: true
  },
  genre: {
    type: String,
  },
  birthday: {
    type: Date,
  }
})

const User = mongoose.model('User', userSchema);
module.exports = User;

// TODO - Not working
User.schema.path('email').validate(function (value) {                                                                                           
  User.findOne({ email: value }, function (err, user) {                                                                                                
      if(user){
        return false;
      }
      return true;                                                                                              
  });                                                                                                                                                  
}, 'This email address is already registered');

User.schema.path('username').validate(function (value) {                                                                                           
  User.findOne({ username: value }, function (err, user) {                                                                                                
      if(user){
        return false;
      }
      return true;                                                                                              
  });                                                                                                                                                  
}, 'This username is already registered');

User.schema.path('legalDocument').validate(function (value) {                                                                                           
  User.findOne({ legalDocument: value }, function (err, user) {                                                                                                
      if(user){
        return false;
      }
      return true;                                                                                              
  });                                                                                                                                                  
}, 'This legalDocument is already registered');
