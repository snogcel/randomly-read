const { body, validationResult } = require('express-validator/check');
const ObjectId = require('mongodb').ObjectId;
const User = require('../models/user');

// TODO - add auth

// https://jsonapi.org/format/#document-resource-object-attributes

// https://github.com/holidayextras/jsonapi-store-mongodb

// https://github.com/carsondarling/mongoose-jsonapi

function transformData (data, type) {
  console.log(data);

  let id = data.id;

  let attributes = data;
  delete attributes.id;

  let result = {
    "id": data.id,
    "attributes": attributes
  }

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

  console.log(data);

  let result = [];

  // iterate through data
  for (var i = 0; i < data.length; i++) {
    let id = data[i].id;

    let attributes = data[i];
    delete attributes.id;

    // format into JSONAPI
    let dataSet = {
      "id": data[i].id,
      "attributes": attributes
    }

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

// update users

// list routine options

// update routine options

// list interactions

// update interaction settings

