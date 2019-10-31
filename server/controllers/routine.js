const { body, validationResult } = require('express-validator/check');
const ObjectId = require('mongodb').ObjectId;
const Routine = require('../models/routine');
const User = require('../models/user');

const UserHistoryInitial = require('../models/userHistoryInitial');

const math = require('mathjs');

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

async function generateSuggestedRoutine(userHistory) {

  let userHistoryObj = JSON.parse(JSON.stringify(userHistory));

  let vowelCount = [];
  let consonantCount = [];

  for (var key of Object.keys(userHistoryObj)) {

    if (key.indexOf("vowel_") >= 0) {
      if (userHistoryObj[key] > 0) vowelCount.push(userHistoryObj[key]);
    }

    if (key.indexOf("consonant_") >= 0) {
      if (userHistoryObj[key] > 0) consonantCount.push(userHistoryObj[key]);
    }

  }

  // for future use?
  let vowelStdDev = math.std(vowelCount);
  let consonantStdDev = math.std(consonantCount);

  let vowelMean = math.mean(vowelCount);
  let consonantMean = math.mean(consonantCount);

  let vowels = [];
  let consonants = [];

  for (var key of Object.keys(userHistoryObj)) {

    if (key.indexOf("vowel_") >= 0) {
      for (let i = 0; i < userHistoryObj[key]; i++) {
        if (userHistoryObj[key] >= vowelMean) vowels.push(key.split('_').pop());
      }
    }

    if (key.indexOf("consonant_") >= 0) {
      for (let i = 0; i < userHistoryObj[key]; i++) {
        if (userHistoryObj[key] >= consonantMean) consonants.push(key.split('_').pop());
      }
    }

  }

  return {
    vowels: vowels,
    consonants: consonants
  }

}

exports.settings = async (req, res) => {
  const author = req.user.id;
  const a_id = new ObjectId(author);

  let assigned = [];

  const userHistory = await UserHistoryInitial.findOne({"user": a_id});

  let { vowels, consonants } = await generateSuggestedRoutine(userHistory); // if average or greater upvotes

  let id = a_id;
  let name = "Suggested Words";
  let subroutine = [{
    "index": Date.now(),
    "rangeVal": 5,
    "repetitions": 25,
    "mode": "Word",
    "isIntermission": false,
    "vowels": vowels,
    "consonants": consonants,
    "syllables": [ "1", "2" ],
    "position": "initial"
  }];

  // fetch user by ID
  await User.findOne({"_id": a_id}, function(err, data) {

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



    // include default routines
    data.unshift({
      "id": id,
      "name": name,
      "subroutine": subroutine
    });

    console.log(data);

    if (err) {
      response = {"error": true, "message": "Error fetching data"};
      res.json(response);
    } else {
      response = transformRoutineSet(data, "routines");
      res.json(response);
    }

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
