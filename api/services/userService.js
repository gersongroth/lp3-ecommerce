'use strict';

const User = require('../models/userSchema');

exports.findByUsername = async function(username) {
  return await User.find({username});
}

exports.login = async function(username, password) {
  return await User.findOne({
    username,
    password,
  });
}