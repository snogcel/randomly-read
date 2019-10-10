const { body, validationResult } = require('express-validator/check');
const ObjectId = require('mongodb').ObjectId;
const User = require('../models/user');
const Interaction = require('../models/interaction');
const interactionSettings = require('../models/interactionSettings');

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

exports.create = async (req, res, next) => {

  const result = validationResult(req);
  if (!result.isEmpty()) {
    const errors = result.array({ onlyFirstError: true });
    return res.status(422).json({ errors });
  }

  try {
    const { setting, audience, intention, applied, ease } = req.body;
    const author = req.user.id;
    const interaction = await Interaction.create({
      author,
      setting,
      audience,
      intention,
      applied,
      ease,
    });
    res.status(201).json(interaction);
  } catch (err) {
    next(err);
  }

};

exports.list = async (req, res) => {
  const author = req.user.id;
  const a_id = new ObjectId(author);
  const interactions =  await Interaction.find({"author":a_id,"createdAt":{$gt:new Date(Date.now() - (12 * 60* 60 * 1000))}}).sort({"createdAt":-1});
  res.json(interactions);
};


exports.settings = async (req, res) => {
  const author = req.user.id;
  const a_id = new ObjectId(author);

  let assigned = [];

  // fetch user by ID
  await User.findOne({"_id": a_id}, function(err, data) {

    if(err) {
      response = {"error" : true, "message" : "Error fetching data"};
      res.json(response);
    } else {
      let obj = JSON.parse(JSON.stringify(data));
      assigned = obj.interactionSettings;
    }

  });

  let response = {};

  interactionSettings.find({
    '_id': {$in: assigned}
  }, function (err, data) {

    if (err) {
      response = {"error": true, "message": "Error fetching data"};
      res.json(response);
    } else {
      response = transformRoutineSet(data, "interactionSettings");
      res.json(response);
    }

  });

};

exports.delete = async (req, res) => {
  const interaction = req.params.id;
  const o_id = new ObjectId(interaction);

  let response = {};

  await Interaction.remove({"_id": o_id}, function(err, data) {

    if(err) {
      response = {"error" : true, "message" : "Error deleting data"};
      res.json(response);
    } else {
      res.json({ message: 'success' });
    }

  });
};

// TODO - remove

exports.listby24hrs = async (req, res) => {
  const interactions = await Interaction.find({"createdAt":{$gt:new Date(Date.now() - 24 * 60* 60 * 1000)}})
  res.json(interactions)
}

exports.listbyWeek = async (req, res) => {
  const interactions = await Interaction.find({"createdAt":{$gt:new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)}})
  res.json(interactions)
}
let d = new Date();
exports.listbyMonth = async (req, res) => {
  const interactions = await Interaction.find({"createdAt":{$gt:new Date(d.setMonth(d.getMonth() - 1))}})
  res.json(interactions)
}

exports.listby3Months = async (req, res) => {
  const interactions = await Interaction.find({"createdAt":{$gt:new Date(d.setMonth(d.getMonth() - 1 * 3))}})
  res.json(interactions)
}
