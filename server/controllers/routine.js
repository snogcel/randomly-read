const { body, validationResult } = require('express-validator/check');
const ObjectId = require('mongodb').ObjectId;
const Routine = require('../models/routine');
const User = require('../models/user');
const Post = require('../models/post');

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

async function upVotedRoutines(author) {

  const category = "upvoted";
  const posts = await Post.find({ author: new ObjectId(author), category: category }).sort('-created');

  let routines = [];

  // parse through posts to create upvoted routines

  for (let i = 0; i < posts.length; i++) {

    let subroutine = [{
      "index": Date.now(),
      "rangeVal": 5,
      "repetitions": 25,
      "mode": "Word",
      "isIntermission": false,
      "vowels": [posts[i].vowel],
      "consonants": [posts[i].consonant],
      "syllables": [], // posts[i].syllables
      "position": posts[i].position
    }];

    routines.push({
      "id": posts[i]._id,
      "name": "Words based on '" + posts[i].title + "'",
      "subroutine": subroutine
    })

  }

  // console.log(routines);

  return routines;

}

exports.settings = async (req, res) => {

  const author = req.user.id;

  let obj = {};
  let parsedObj = {};

  let votedRoutines = await upVotedRoutines(author);

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

      for (let i = 0; i < votedRoutines.length; i++) {
        data.push(votedRoutines[i]);
      }

      console.log(data);

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
