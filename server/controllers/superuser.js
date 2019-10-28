const { body, validationResult } = require('express-validator/check');
const ObjectId = require('mongodb').ObjectId;
const Routine = require('../models/routine');
const User = require('../models/user');

// TODO - move to Utils
function transformDataSet(data, type) {

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
  const superuser = req.user.id;
  const s_id = new ObjectId(superuser);

  let clients = [];

  // fetch superuser by ID
  await User.findOne({"_id": s_id}, function(err, data) {

    if(err) {
      response = {"error" : true, "message" : "Error fetching data"};
      res.json(response);
    } else {
      let obj = JSON.parse(JSON.stringify(data));
      clients = obj.clients;
    }

  });

  clients.unshift(superuser); // include superuser in result

  let response = {};

  // fetch and return users defined as "clients" of superuser
  User.find({
    '_id': {$in: clients}
  }, function (err, data) {

    if (err) {
      response = {"error": true, "message": "Error fetching data"};
      res.json(response);
    } else {
      response = transformDataSet(data, "users");
      res.json(response);
    }

  });

};

exports.routines = async (req, res) => {
  const superuser = req.user.id;
  const id = req.params.id;
  const u_id = new ObjectId(id);

  let assigned = [];

  // fetch user by ID
  await User.findOne({"_id": u_id}, function(err, data) {

    if(err) {
      response = {"error" : true, "message" : "Error fetching data"};
      res.json(response);
    } else {
      let obj = JSON.parse(JSON.stringify(data));
      assigned = obj.routines;
    }

  });

  let response = {};

  Routine.find({
    '_id': {$in: assigned}
  }, function (err, data) {

    if (err) {
      response = {"error": true, "message": "Error fetching data"};
      res.json(response);
    } else {
      response = transformDataSet(data, "routines");
      res.json(response);
    }

  });

};
