const { body, validationResult } = require('express-validator/check');
const User = require('../models/user');

// TODO - add auth

// list all users
exports.listAll = async (req, res) => {
  const authors =  await User.find({});
  res.json(authors);
};

// update users

// list routine options

// update routine options

// list interactions

// update interaction settings

