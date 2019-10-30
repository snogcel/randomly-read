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

exports.createRoutine = async (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const errors = result.array({ onlyFirstError: true });
    return res.status(422).json({ errors });
  }

  try {
    const { userId, routineName } = req.body;
    const u_id = new ObjectId(userId);

    let routines = [];
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

    console.log("userId: ", userId);
    console.log("routineName: ", routineName);

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
        User.findOne({"_id": u_id}, function(err, data) {

          if(err) {
            next(err);
          } else {
            let obj = JSON.parse(JSON.stringify(data));
            obj.routines.push(routineId); // add new routine to routines array

            // Add to Related User Routines array
            User.findOneAndUpdate({"_id":u_id}, obj, {new: true}, function(err, data) {

              if(err) {
                next();
              } else {

                // fetch new availableRoutines and return
                Routine.find({
                  '_id': {$in: obj.routines}
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
  const u_id = new ObjectId(userId);

  const routineId = req.params.routineId;
  const o_id = new ObjectId(routineId);

  console.log("userId: ", userId);
  console.log("routineId: ", routineId);

  let response = {};

  // delete routine

  // Find Related User
  User.findOne({"_id": u_id}, function(err, data) {

    if(err) {
      response = {"error" : true, "message" : "Error deleting data"};
      res.json(response);
    } else {
      let obj = JSON.parse(JSON.stringify(data));
      let routines = [];

      for (let i = 0; i < obj.routines.length; i++) {
        if (obj.routines[i] !== routineId) routines.push(obj.routines[i]); // remove routine from user obj
      }

      obj.routines = routines;

      // Remove from Related User Routines array
      User.findOneAndUpdate({"_id":u_id}, obj, {new: true}, function(err, data) {

        if(err) {
          response = {"error" : true, "message" : "Error deleting data"};
          res.json(response);
        } else {

          // Delete Routine from Server
          Routine.deleteOne({"_id":o_id}, function(err, data) {

            if(err) {
              response = {"error" : true, "message" : "Error deleting data"};
              res.json(response);
            } else {

              // fetch new availableRoutines and return
              Routine.find({
                '_id': {$in: routines}
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
