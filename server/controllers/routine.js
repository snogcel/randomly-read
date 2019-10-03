const { body, validationResult } = require('express-validator/check');
const Routine = require('../models/routine');

const name = "Vowel Specific - ɪ";

const subroutine = [
      {
        "rangeVal": 5,
        "repetitions": 10,
        "isIntermission": false,
        "mode": "Word",
        "vowels": ["IH"],
        "consonants": ["B","D","G","P","T","K"],
        "syllables": ["1","2","3","4","5"],
      },
      {
        "rangeVal": 5,
        "repetitions": 1,
        "isIntermission": true,
        "intermissionText": "relax",
      },
      {
        "rangeVal": 5,
        "repetitions": 10,
        "isIntermission": false,
        "mode": "Word",
        "vowels": ["IH"],
        "consonants": ["B","D","G","P","T","K"],
        "syllables": ["1","2","3","4","5"],
      }
    ];


// list all routines
exports.all = async (req, res) => {

  let response = {};

  await Routine.find({}, function(err, data) {

    if(err) {
      response = {"error" : true, "message" : "Error fetching data"};
    } else {
      response = transformDataSet(data, "users");
    }

  });

  res.json(response);

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
