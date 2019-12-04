const { check, body, validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
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

exports.users = async (req, res) => {
  const s_id = req.user.id;

  let obj = {};
  let parsedObj = {};
  let clients = [];

  // fetch superuser by ID
  await User.findOne({"_id": new ObjectId(s_id)}, function(err, data) {

    if(err) {
      response = {"error" : true, "message" : "Error fetching data"};
      res.json(response);
    } else {
      obj = JSON.parse(JSON.stringify(data));
      clients = obj.clients;
    }

    // TODO - find a better way to handle this
    clients.unshift(s_id); // include superuser in result
    obj.clients = clients;

    parsedObj = parseUserObj(obj);

    let response = {};

    // fetch and return users defined as "clients" of superuser
    User.find({
      '_id': {$in: parsedObj.clients}
    }, function (err, data) {

      if (err) {
        response = {"error": true, "message": "Error fetching data"};
        res.json(response);
      } else {
        response = transformDataSet(data, "users");
        res.json(response);
      }

    });

  });

};

exports.user = async (req, res) => {
  const superuser = req.user.id;
  const id = req.params.id;
  const u_id = new ObjectId(id);

  let response = {};

  // fetch user by ID
  await User.findOne({"_id": u_id}, function(err, data) {

    if(err) {
      response = {"error" : true, "message" : "Error fetching data"};
      res.json(response);
    } else {
      response = transformData(data, "user");
      res.json(response);
    }

  });

};

exports.createUser = async (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const errors = result.array({ onlyFirstError: true });
    return res.status(422).json({ errors });
  }

  try {

    const { username, password, firstName, lastName, isActive } = req.body;

    let routines = [];

    let user = {
      "username": username,
      "password": password,
      "firstName": firstName,
      "lastName": lastName,
      "isActive": isActive
    };

    // Create User
    const newUser = await User.create({ username, password, firstName, lastName, isActive });

    // superuser ID
    const s_id = req.user.id;

    let obj = {};
    let parsedObj = {};

    // fetch superuser by ID
    await User.findOne({"_id": new ObjectId(s_id)}, function(err, data) {

      if(err) {
        response = {"error" : true, "message" : "Error fetching data"};
        res.json(response);
      } else {
        obj = JSON.parse(JSON.stringify(data));

        // append new user to superuser clients array
        obj.clients.push(new ObjectId(newUser._id.toString()));

        parsedObj = parseUserObj(obj);

        let response = {};

        User.findOneAndUpdate({"_id": new ObjectId(s_id)}, parsedObj, {new: true}, function(err, data) {
          if(err) {
            response = {"errors" : true, "message" : "Error fetching data"};
            res.json(response);
          } else {
            response = transformData(newUser, "user");
            res.status(201).json(response);
          }
        });

      }

    });

  } catch (err) {
    next(err);
  }

};

exports.updateUser = async (req, res, next) => {

  const result = validationResult(req);

  // only validate if password is included
  if (!result.isEmpty()) {
    const errors = result.array({ onlyFirstError: true });
    return res.status(422).json({ errors });
  }

  try {

    const superuser = req.user.id;

    const id = req.params.id;

    let response = {};

    let userObj = {
      "firstName": req.body.firstName,
      "lastName": req.body.lastName,
      "isActive": req.body.isActive
    };

    // rehash new password and update
    if (req.body.password) {
      let password = await bcrypt.hash(req.body.password, 10);
      userObj.password = password;
    }

    // fetch user by ID
    await User.findOneAndUpdate({"_id": new ObjectId(id)}, userObj, {new: true}, function(err, data) {
      if(err) {
        response = {"errors" : true, "message" : "Error fetching data"};
        res.json(response);
      } else {
        response = transformData(data, "user");
        res.status(201).json(response);
      }
    });

  } catch (err) {
    next(err);
  }

};

exports.validate = method => {

  const errors = [
    body('username')
      .exists()
      .withMessage('is required')

      .isLength({ min: 1 })
      .withMessage('cannot be blank')

      .isLength({ max: 32 })
      .withMessage('must be at most 32 characters long')

      .custom(value => value.trim() === value)
      .withMessage('cannot start or end with whitespace')

      .matches(/^[a-zA-Z0-9_-]+$/)
      .withMessage('contains invalid characters'),

    body('firstName')
      .exists()
      .withMessage('is required')

      .isLength({ min: 1 })
      .withMessage('cannot be blank')

      .isLength({ max: 32 })
      .withMessage('must be at most 32 characters long')

      .custom(value => value.trim() === value)
      .withMessage('cannot start or end with whitespace')

      .matches(/^[a-zA-Z0-9_-]+$/)
      .withMessage('contains invalid characters'),

    body('lastName')
      .exists()
      .withMessage('is required')

      .isLength({ min: 1 })
      .withMessage('cannot be blank')

      .isLength({ max: 32 })
      .withMessage('must be at most 32 characters long')

      .custom(value => value.trim() === value)
      .withMessage('cannot start or end with whitespace')

      .matches(/^[a-zA-Z0-9_-]+$/)
      .withMessage('contains invalid characters'),

    body('password')
      .optional()

      .isLength({ min: 1 })
      .withMessage('cannot be blank')

      .isLength({ min: 8 })
      .withMessage('must be at least 8 characters long')

      .isLength({ max: 72 })
      .withMessage('must be at most 72 characters long')
  ];

  if (method === 'register') {
    errors.push(
      body('username').custom(async username => {
        const exists = await User.countDocuments({ username });
        if (exists) throw new Error('already exists');
      })
    );
  }

  return errors;
};

exports.routines = async (req, res) => {
  const superuser = req.user.id;
  const id = req.params.id;

  let assigned = [];
  let obj = {};
  let parsedObj = {};

  // fetch user by ID
  await User.findOne({"_id": new ObjectId(id)}, function(err, data) {

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
        response = transformDataSet(data, "routines");
        res.json(response);
      }

    });

  });

};

exports.createRoutine = async (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const errors = result.array({ onlyFirstError: true });
    return res.status(422).json({ errors });
  }

  try {
    const { userId, routineName } = req.body;

    let subroutine = [{
      "index": Date.now(),
      "rangeVal": 5,
      "repetitions": 10,
      "mode": "Word",
      "isIntermission": false,
      "vowels": [],
      "consonants": [],
      "syllables": [
        1,
        2,
        3
      ],
      "position": "initial"
    }];

    let obj = {};
    let parsedObj = {};

    // Create Routine
    Routine.create({
      "name": routineName,
      "subroutine": subroutine
    }, function (err, data) {
      if (err) {
        next(err);
      } else {

        const routineId = data._id;

        // Find Related User
        User.findOne({"_id": new ObjectId(userId)}, function(err, data) {

          if(err) {
            next(err);
          } else {
            let obj = JSON.parse(JSON.stringify(data));
            obj.routines.push(new ObjectId(routineId)); // add new routine to routines array

            parsedObj = parseUserObj(obj);

            // Add to Related User Routines array
            User.findOneAndUpdate({"_id": new ObjectId(userId)}, parsedObj, {new: true}, function(err, data) {

              if(err) {
                next();
              } else {

                // fetch new availableRoutines and return
                Routine.find({
                  '_id': {$in: parsedObj.routines}
                }, function (err, data) {

                  if (err) {
                    response = {"error": true, "message": "Error deleting data"};
                    res.json(response);
                  } else {
                    response = transformDataSet(data, "routines");

                    response.newRoutineId = routineId;
                    response.newRoutineName = routineName;
                    response.subroutine = subroutine;

                    res.status(201).json(response);
                  }

                });

                // res.status(201).json({ "id": routineId, "name": routineName });

              }

            });

          }
        });

      }

    });

  } catch (err) {
    next(err);
  }

};

// delete routine
exports.deleteRoutine = async (req, res) => {

  const userId = req.params.userId;

  const routineId = req.params.routineId;

  let response = {};
  let obj = {};
  let parsedObj = {};

  // delete routine

  // Find Related User
  User.findOne({"_id": new ObjectId(userId)}, function(err, data) {

    if(err) {
      response = {"error" : true, "message" : "Error deleting data"};
      res.json(response);
    } else {
      obj = JSON.parse(JSON.stringify(data));

      let routines = [];

      for (let i = 0; i < obj.routines.length; i++) {
        if (obj.routines[i] !== routineId) routines.push(new ObjectId(obj.routines[i])); // remove routine from user obj
      }

      obj.routines = routines;

      parsedObj = parseUserObj(obj);

      // Remove from Related User Routines array
      User.findOneAndUpdate({"_id": new ObjectId(userId)}, parsedObj, {new: true}, function(err, data) {

        if(err) {
          response = {"error" : true, "message" : "Error deleting data"};
          res.json(response);
        } else {

          // Delete Routine from Server
          Routine.deleteOne({"_id": new ObjectId(routineId)}, function(err, data) {

            if(err) {
              response = {"error" : true, "message" : "Error deleting data"};
              res.json(response);
            } else {

              // fetch new availableRoutines and return
              Routine.find({
                '_id': {$in: parsedObj.routines}
              }, function (err, data) {

                if (err) {
                  response = {"error": true, "message": "Error deleting data"};
                  res.json(response);
                } else {
                  response = transformDataSet(data, "routines");
                  res.json(response);
                }

              });

            }

          });

        }

      });

    }
  });

};
