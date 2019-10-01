const ObjectId = require('mongodb').ObjectId;
const User = require('../models/user');
const Routine = require('../models/routine');


// TODO - add auth

const routineParams = [
  { id: "AA", name: "ɑ"},
  { id: "AE", name: "æ"},
  { id: "AH", name: "ʌ"},
  { id: "AO", name: "ɔ"},
  { id: "AW", name: "aʊ"},
  { id: "AY", name: "aɪ"},
  { id: "EH", name: "ɛ"},
  { id: "ER", name: "ɝ"},
  { id: "EY", name: "eɪ"},
  { id: "IH", name: "ɪ"},
  { id: "IY", name: "i"},
  { id: "OW", name: "oʊ"},
  { id: "OY", name: "ɔɪ"},
  { id: "UW", name: "u"},
  { id: "B", name: "b"},
  { id: "CH", name: "tʃ"},
  { id: "D", name: "d"},
  { id: "F", name: "f"},
  { id: "G", name: "g"},
  { id: "HH", name: "h"},
  { id: "JH", name: "dʒ"},
  { id: "K", name: "k"},
  { id: "L", name: "l"},
  { id: "M", name: "m"},
  { id: "N", name: "n"},
  { id: "P", name: "p"},
  { id: "R", name: "ɹ"},
  { id: "S", name: "s"},
  { id: "SH", name: "ʃ"},
  { id: "T", name: "t"},
  { id: "TH", name: "θ"},
  { id: "V", name: "v"},
  { id: "W", name: "w"},
  { id: "Y", name: "j"},
  { id: "Z", name: "Z"},
  { id: "1", name: "1 Syllable"},
  { id: "2", name: "2 Syllables"},
  { id: "3", name: "3 Syllables"},
  { id: "4", name: "4 Syllables"},
  { id: "5", name: "5 Syllables"},
];

// TODO - move to Utils
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

// TODO - move to Utils
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

// TODO - move to Utils
function transformRoutineSet(data, type) {

  let result = [];

  // iterate through data
  for (var i = 0; i < data.length; i++) {
    let id = data[i].id;

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

// TODO - move to Utils
function transformRoutine (data, type) {

  const id = data.id;

  let attributes = data;

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


// list all routines
exports.routines = async (req, res) => {

  if (typeof req.query.page !== "undefined" && typeof req.query.sort !== "undefined" && typeof(req.query.filter === "undefined")) {

    // TODO - Paging
    // TODO - Sorting

    let response = {};

    await Routine.find({}, function(err, data) {

      if(err) {
        response = {"error" : true, "message" : "Error fetching data"};
        res.json(response);
      } else {
        response = transformDataSet(data, "routines");
        res.json(response);
      }

    });

  }

  if (typeof req.query.page === "undefined" && typeof req.query.sort === "undefined" && typeof req.query.filter !== "undefined") {

    const filter = JSON.parse(req.query.filter);

    let regExp = /[0-9A-Fa-f]{6}/g;

    // test if first argument is a mongodb id -- a little bit hacky...
    if (regExp.test(filter["id"][0])) {

      let response = {};

      Routine.find({
        '_id': { $in: filter["id"] }
      }, function(err, data) {

        if(err) {
          response = {"error" : true, "message" : "Error fetching data"};
          res.json(response);
        } else {
          response = transformDataSet(data, "routines");
          res.json(response);
        }

      });

    } else {

      // Return Routine Parameters
      // TODO - build into custom "ReferenceArrayInput" component to avoid this case altogether

      let data = [];
      let params = JSON.parse(req.query.filter);

      for (let i = 0; i < params.id.length; i++) {

        let obj = routineParams.find(obj => obj.id === params.id[i]);
        data.push(obj);

      }

      let response = transformRoutineSet(data, "consonants");
      res.json(response);

    }

  }

};


// list routine
exports.routine = async (req, res) => {

  const id = req.params.id;
  const o_id = new ObjectId(id);

  let response = {};

  Routine.find({ '_id': o_id }, function(err, data) {

    if(err) {
      response = {"error" : true, "message" : "Error fetching data"};
      res.json(response);
    } else {
      response = transformRoutine(data[0], "routines");
      res.json(response);
    }

  });

};


// update routine options


// list interactions


// update interaction settings


// test routine options


// TODO - remove these once Edit / Create is completed...
const routineTestDataSet = [
  {
    "id": "5d8a75730d35bc728c96e777",
    "name": "Vowel Specific - ɪ",
    "subroutine": [
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
    ]
  }
];

const routineTestData = {
  id: "5d938e7cd2c8841dbcaaf9ac",
  name: "Vowel Specific - ɪ",
  subroutine: [
    {
      duration: 50,
      rangeVal: 5,
      map: "randomly",
      intermissionText: "",
      mode: "Word",
      limit: 1,
      vowels: [
        "IH"
      ],
      consonants: ["B","D","G","P","T","K"],
      consonants_name: ["B","D","G","P","T","K"],
      templates: [],
      syllables: ["1","2","3","4","5"],
      repetitions: 10
    },
    {
      duration: 5,
      rangeVal: 5,
      map: 'intermission',
      intermissionText: "relax",
      mode: 'Intermission',
      limit: 1,
      vowels: [],
      consonants: [],
      consonants_name: [],
      templates: [],
      syllables: [],
      repetitions: 1
    },
    {
      duration: 50,
      rangeVal: 5,
      map: "default",
      intermissionText: "",
      mode: "Word",
      limit: 1,
      vowels: [
        "IH"
      ],
      consonants: ["B","D","G","P","T","K"],
      consonants_name: ["B","D","G","P","T","K"],
      templates: [],
      syllables: ["1","2","3","4","5"],
      repetitions: 10
    }
  ]
};
