const { body, validationResult } = require('express-validator/check');
const Routine = require('../models/routine');

const name = "Vowel Specific - ɪ";

const subroutine = [
      {
        "duration": 50,
        "rangeVal": 5,
        "map": "randomly",
        "intermissionText": "",
        "mode": "Word",
        "limit": 1,
        "vowels": [
          "IH"
        ],
        "consonants": ["B","D","G","P","T","K"],
        "templates": [],
        "syllables": ["1","2","3","4","5"],
        "repetitions": 10
      },
      {
        "duration": 5,
        "rangeVal": 5,
        "map": "intermission",
        "intermissionText": "relax",
        "mode": "Intermission",
        "limit": 1,
        "vowels": [],
        "consonants": [],
        "templates": [],
        "syllables": [],
        "repetitions": 1
      },
      {
        "duration": 50,
        "rangeVal": 5,
        "map": "default",
        "intermissionText": "",
        "mode": "Word",
        "limit": 1,
        "vowels": [
          "IH"
        ],
        "consonants": ["B","D","G","P","T","K"],
        "templates": [],
        "syllables": ["1","2","3","4","5"],
        "repetitions": 10
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
