const { body, validationResult } = require('express-validator/check');
const ObjectId = require('mongodb').ObjectId;
const ViewHistory = require('../models/viewHistory');
const Post = require('../models/post');
const moment = require('moment-timezone');


function transformViewHistory(data, start, end, type) {

  let result = []; // for parsing mongo results
  let resultSet = []; // for stubbing out range of dates in filter

  let startDate = moment(new Date(start * 1000)).tz("America/New_York").startOf("day");
  let endDate = moment(new Date(end * 1000)).tz("America/New_York").startOf("day");

  let range = endDate.diff(startDate, 'days');

  // stub out response array
  for (let i = 0; i <= range; i++) {

    let id = startDate.format('YYYY-MM-DD');
    let attributes = {
      "_id": id,
      "name": startDate.format('dd'),
      "fullDate": startDate.format('MMM Do YYYY'),
      "count": 0
    };

    resultSet.push(attributes);

    startDate.add(1, 'day');

  }

  // iterate through data
  for (let i = 0; i < data.length; i++) {

    let id = data[i]._id;

    let attributes = data[i];

    let m = moment(attributes._id, 'YYYY-MM-DD');

    attributes.name = m.format('dd');
    attributes.fullDate = m.format('MMM Do YYYY');

    // format into JSONAPI
    let dataSet = {
      "id": id,
      "attributes": attributes
    };

    result.push(attributes);
  }

  // update resultData with actual data counts
  for (let i = 0; i < result.length; i++) {

    for (let j = 0; j < resultSet.length; j++) {

      if (result[i]._id === resultSet[j]._id) {
        resultSet[j].count = result[i].count;
      }

    }

  }

  let results = {
    dataSet: resultSet,
    startDate: start,
    endDate: end
  };

  return {
    "type": type,
    "error": false,
    "message": "OK",
    "data": results,
    "meta": {
      "total": result.length
    }
  }

}

exports.list = async (req, res) => {
  // const superuser = req.user.id; // TODO - remove?

  const id = req.params.id;

  const startDate = req.params.start;
  const endDate = req.params.end;

  let response = {};

  // fetch view history by userId
  await ViewHistory.aggregate([
    { $match: {
        author: new ObjectId(id),
        "created": {
          "$gte": new Date(startDate * 1000),
          "$lte": new Date(endDate * 1000)
        }
      } },
    { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$created", timezone: "America/New_York" } }, count: { $sum: 1 } } },
    { $sort: { _id: 1 } }
  ], function(err, data) {

    if(err) {
      response = {"error" : true, "message" : "Error fetching data"};
      res.json(response);
    } else {
      response = transformViewHistory(data, startDate, endDate, "ViewHistory");
      res.json(response);

    }

  });

};
