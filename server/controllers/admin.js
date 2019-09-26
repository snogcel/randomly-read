const { body, validationResult } = require('express-validator/check');
const ObjectId = require('mongodb').ObjectId;
const User = require('../models/user');

// TODO - add auth

function transformData (data, type) {

  const id = data.id;

  let attributes = data;
  delete attributes.id;

  let result = {
    "id": id,
    "attributes": attributes
  };

  return {
    "type": type,
    "error": false,
    "message": "OK",
    "data": result,
    "meta": {
      "total": 1
    }
  }
}

function transformDataSet(data, type) {

  let result = [];

  // iterate through data
  for (var i = 0; i < data.length; i++) {
    let id = data[i].id;

    let attributes = data[i];
    delete attributes.id;

    // format into JSONAPI
    let dataSet = {
      "id": id,
      "attributes": attributes
    };

    result.push(dataSet);
  }

  return {
    "type": type,
    "error": false,
    "message": "OK",
    "data": result,
    "meta": {
      "total": result.length
    }
  }

}


// list all users
exports.users = async (req, res) => {

  let response = {};

  await User.find({}, function(err, data) {

    if(err) {
      response = {"error" : true, "message" : "Error fetching data"};
    } else {
      response = transformDataSet(data, "users");
    }

  });

  res.json(response);

};

// list specific user
exports.user = async (req, res) => {

  const id = req.params.id;
  const o_id = new ObjectId(id);

  let response = {};

  await User.findOne({"_id":o_id}, function(err, data) {

    if(err) {
      response = {"error" : true, "message" : "Error fetching data"};
    } else {
      response = transformData(data, "user");
    }

  });

  res.json(response);

};

// update specific user
exports.updateUser = async (req, res) => {

  const id = req.params.id;
  const o_id = new ObjectId(id);

  let response = {};

  let attributes = req.body.data.attributes;
  delete attributes.id;

  await User.findOneAndUpdate({"_id":o_id}, attributes, function(err, data) {

    if(err) {
      response = {"error" : true, "message" : "Error fetching data"};
    } else {
      response = transformData(data, "user");
    }

  });

  res.json(response);

};

// update users

// list routine options

// update routine options

// list interactions

// update interaction settings

