const { body, validationResult } = require('express-validator/check');
const ObjectId = require('mongodb').ObjectId;
const User = require('../models/user');
const Routine = require('../models/routine');
const interactionSettings = require('../models/interactionSettings');

// TODO - add auth

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

// TODO - move to Utils
function transformRoutine (data, type) {

  const id = data._id;

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

  await User.find({
    'superuser': {$in: [false, undefined]}
  }, function(err, data) {

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

  await User.findOneAndUpdate({"_id":o_id}, attributes, {new: true}, function(err, data) {

    if(err) {
      response = {"error" : true, "message" : "Error fetching data"};
    } else {
      response = transformData(data, "user");
    }

  });

  res.json(response);

};


// create user
exports.createUser = async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const errors = result.array({ onlyFirstError: true });
    return res.status(422).json({ errors });
  }

  try {

    let response = {};
    let attributes = req.body.data.attributes;

    await User.create(attributes, function(err, data) {

      if(err) {
        response = {"error" : true, "message" : err};
        res.json(response);
      } else {
        response = transformRoutine(data, "routines");
        res.json(response);
      }

    });

  } catch (err) {
    return res.status(422).json(err);
  }
};


// list all superusers
exports.superUsers = async (req, res) => {

  let response = {};

  await User.find({"superuser": true}, function(err, data) {

    if(err) {
      response = {"error" : true, "message" : "Error fetching data"};
    } else {
      response = transformDataSet(data, "users");
    }

  });

  res.json(response);

};


// list specific superUser -- TODO remove?
exports.superUser = async (req, res) => {

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


// update specific user -- TODO remove?
exports.updateSuperUser = async (req, res) => {

  const id = req.params.id;
  const o_id = new ObjectId(id);

  let response = {};

  let attributes = req.body.data.attributes;
  delete attributes.id;

  await User.findOneAndUpdate({"_id":o_id}, attributes, {new: true}, function(err, data) {

    if(err) {
      response = {"error" : true, "message" : "Error fetching data"};
    } else {
      response = transformData(data, "user");
    }

  });

  res.json(response);

};


// create user -- TODO remove?
exports.createSuperUser = async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const errors = result.array({ onlyFirstError: true });
    return res.status(422).json({ errors });
  }

  try {

    let response = {};
    let attributes = req.body.data.attributes;

    await User.create(attributes, function(err, data) {

      if(err) {
        response = {"error" : true, "message" : err};
        res.json(response);
      } else {
        response = transformRoutine(data, "routines");
        res.json(response);
      }

    });

  } catch (err) {
    return res.status(422).json(err);
  }
};


// list all routines
exports.routines = async (req, res) => {

  console.log(req.query);

  if (typeof req.query.filter !== "undefined") {

    const filter = JSON.parse(req.query.filter);

    let response = {};

    Routine.find({
      '_id': {$in: filter["id"]}
    }, function (err, data) {

      if (err) {
        response = {"error": true, "message": "Error fetching data"};
        res.json(response);
      } else {
        response = transformRoutineSet(data, "routines");
        res.json(response);
      }

    });

  } else {

    // TODO - Paging
    // TODO - Sorting

    let response = {};

    await Routine.find({}, function(err, data) {

      if(err) {
        response = {"error" : true, "message" : "Error fetching data"};
        res.json(response);
      } else {
        response = transformRoutineSet(data, "routines");
        res.json(response);
      }

    });

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
exports.updateRoutine = async (req, res) => {

  const id = req.params.id;
  const o_id = new ObjectId(id);

  let response = {};

  let attributes = req.body.data.attributes;
  delete attributes.id;

  console.log(attributes);

  await Routine.findOneAndUpdate({"_id":o_id}, attributes, {new: true}, function(err, data) {

    if(err) {
      response = {"error" : true, "message" : "Error fetching data"};
      res.json(response);
    } else {

      // console.log(data);

      response = transformRoutine(data, "routines");

      console.log(response);

      res.json(response);
    }

  });

};

// create routine
exports.createRoutine = async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const errors = result.array({ onlyFirstError: true });
    return res.status(422).json({ errors });
  }

  try {

    let response = {};
    let attributes = req.body.data.attributes;

    await Routine.create(attributes, function(err, data) {

      if(err) {
        response = {"error" : true, "message" : "Error writing data"};
        res.json(response);
      } else {
        response = transformRoutine(data, "routines");
        res.json(response);
      }

    });

    } catch (err) {
      return res.status(422).json(err);
  }
};


// delete routine
exports.deleteRoutine = async (req, res) => {

  const id = req.params.id;
  const o_id = new ObjectId(id);

  let response = {};

  await Routine.deleteOne({"_id":o_id}, function(err, data) {

    if(err) {
      response = {"error" : true, "message" : "Error fetching data"};
      res.json(response);
    } else {
      response = transformRoutine(data, "routines");
      res.json(response);
    }

  });

};


// list all interactionSettings
exports.interactionSettings = async (req, res) => {

  console.log(req.query);

  if (typeof req.query.filter !== "undefined") {

    const filter = JSON.parse(req.query.filter);

    let response = {};

    interactionSettings.find({
      '_id': {$in: filter["id"]}
    }, function (err, data) {

      if (err) {
        response = {"error": true, "message": "Error fetching data"};
        res.json(response);
      } else {
        response = transformRoutineSet(data, "interactionSettings");
        res.json(response);
      }

    });

  } else {

    // TODO - Paging
    // TODO - Sorting

    let response = {};

    await interactionSettings.find({}, function(err, data) {

      if(err) {
        response = {"error" : true, "message" : "Error fetching data"};
        res.json(response);
      } else {
        response = transformRoutineSet(data, "interactionSettings");
        res.json(response);
      }

    });

  }

};

// list specific interactionSetting
exports.interactionSetting = async (req, res) => {

  const id = req.params.id;
  const o_id = new ObjectId(id);

  let response = {};

  interactionSettings.find({ '_id': o_id }, function(err, data) {

    if(err) {
      response = {"error" : true, "message" : "Error fetching data"};
      res.json(response);
    } else {
      response = transformRoutine(data[0], "interactionSetting");
      res.json(response);
    }

  });

};

// update routine options
exports.updateInteractionSetting = async (req, res) => {

  const id = req.params.id;
  const o_id = new ObjectId(id);

  let response = {};

  let attributes = req.body.data.attributes;
  delete attributes.id;

  await interactionSettings.findOneAndUpdate({"_id":o_id}, attributes, {new: true}, function(err, data) {

    if(err) {
      response = {"error" : true, "message" : "Error fetching data"};
      res.json(response);
    } else {
      response = transformRoutine(data, "interactionSetting");
      res.json(response);
    }

  });

};

// create routine
exports.createInteractionSetting = async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const errors = result.array({ onlyFirstError: true });
    return res.status(422).json({ errors });
  }

  try {

    let response = {};
    let attributes = req.body.data.attributes;

    await interactionSettings.create(attributes, function(err, data) {

      if(err) {
        response = {"error" : true, "message" : "Error writing data"};
        res.json(response);
      } else {
        response = transformRoutine(data, "interactionSetting");
        res.json(response);
      }

    });

  } catch (err) {
    return res.status(422).json(err);
  }
};


// delete routine
exports.deleteInteractionSetting = async (req, res) => {

  const id = req.params.id;
  const o_id = new ObjectId(id);

  let response = {};

  await interactionSettings.deleteOne({"_id":o_id}, function(err, data) {

    if(err) {
      response = {"error" : true, "message" : "Error fetching data"};
      res.json(response);
    } else {
      response = transformRoutine(data, "interactionSetting");
      res.json(response);
    }

  });

};

// update interaction settings


// test interactionSettings create



exports.interactionSettingsTestCreate = async (req, res) => {

  let name = "Speaking at Work";
  let audience = [ "Family or Friend", "Classmate or Colleague", "Authority Figure", "Service Worker" ];

  try {
    const interactionSetting = await interactionSettings.create({
      name,
      audience
    });
    res.status(201).json(interactionSetting);
  } catch (err) {

    console.log(err);

    res.status(201).json("Error!");
  }

};


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
