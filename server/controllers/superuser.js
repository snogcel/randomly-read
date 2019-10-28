const { body, validationResult } = require('express-validator/check');
const ObjectId = require('mongodb').ObjectId;
const User = require('../models/user');

// TODO - move to Utils
function transformUserSet(data, type) {

  let result = [];

  // iterate through data
  for (var i = 0; i < data.length; i++) {

    let id = data[i]._id;

    let attributes = data[i];

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

exports.users = async (req, res) => {
  const author = req.user.id;
  const a_id = new ObjectId(author);

  let superuser = {};
  let clients = [];

  // fetch superuser by ID
  await User.findOne({"_id": a_id}, function(err, data) {

    if(err) {
      response = {"error" : true, "message" : "Error fetching data"};
      res.json(response);
    } else {
      let obj = JSON.parse(JSON.stringify(data));
      clients = obj.clients;
    }

  });

  console.log(clients);

  let response = {};

  // fetch and return users defined as "clients" of superuser
  User.find({
    '_id': {$in: clients}
  }, function (err, data) {

    if (err) {
      response = {"error": true, "message": "Error fetching data"};
      res.json(response);
    } else {
      response = transformUserSet(data, "users");
      res.json(response);
    }

  });

};
