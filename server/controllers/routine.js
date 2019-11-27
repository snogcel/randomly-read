const { body, validationResult } = require('express-validator/check');
const ObjectId = require('mongodb').ObjectId;
const Routine = require('../models/routine');
const User = require('../models/user');


// TODO - move to Utils
function transformRoutineSet(data, type) {

  let result = [];

  // iterate through data
  for (var i = 0; i < data.length; i++) {

    let id = data[i]._id;

    let attributes = data[i];
    // delete attributes.id; // TODO - revisit this once mongo db is live

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

function parseUserObj (obj) {
  let parsedObj = obj;

  let clients = [];
  let routines = [];

  // clients
  for (let i = 0; i < obj.clients.length; i++) {
    clients.push(new ObjectId(obj.clients[i]));
  }

  // routines
  for (let i = 0; i < obj.routines.length; i++) {
    routines.push(new ObjectId(obj.routines[i]));
  }

  parsedObj.clients = clients;
  parsedObj.routines = routines;

  return parsedObj;
}

exports.settings = async (req, res) => {

  const author = req.user.id;

  let obj = {};
  let parsedObj = {};

  // fetch user by ID
  await User.findOne({"_id": new ObjectId(author)}, function(err, data) {

    if(err) {
      response = {"error" : true, "message" : "Error fetching data"};
      res.json(response);
    } else {
      obj = JSON.parse(JSON.stringify(data));
    }

    parsedObj = parseUserObj(obj);
    let response = {};

    Routine.find({
      '_id': {$in: parsedObj.routines}
    }, function (err, data) {

      if (err) {
        response = {"error": true, "message": "Error fetching data"};
        res.json(response);
      } else {
        response = transformRoutineSet(data, "routines");
        res.json(response);
      }

    });

  });

};








exports.testCreate = async (req, res) => {

  try {
    const routine = await Routine.create({
      name,
      subroutine
    });
    res.status(201).json(routine);
  } catch (err) {
    res.status(201).json("Error!");
  }

};
