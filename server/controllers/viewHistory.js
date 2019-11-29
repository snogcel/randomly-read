const { body, validationResult } = require('express-validator/check');
const ObjectId = require('mongodb').ObjectId;
const ViewHistory = require('../models/viewHistory');
const Post = require('../models/post');
const moment = require('moment');

/*

db.posts.aggregate([
	{ $match: { author: ObjectId("5db72ed498ef22f07b6537fe") } },
        { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$created" } }, count: { $sum: 1 } } },
        { $sort: { _id: 1 } }
])


// where 7 = # of days

db.posts.aggregate([
	{ $match: {
		author: ObjectId("5db72ed498ef22f07b6537fe"),
		"created": { "$gte": new Date(new Date().valueOf() - ( 1000 * 60 * 60 * 24 * 7 )) }
	}},
  { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$created" } }, count: { $sum: 1 } } },
  { $sort: { _id: 1 } }
])

 */

const data = [
  {
    name: 'Mon', fullDate: 'Nov 4th, 2019', words: 240,
  },
  {
    name: 'Tues', fullDate: 'Nov 5th, 2019', words: 139,
  },
  {
    name: 'Wed', fullDate: 'Nov 6th, 2019', words: 0,
  },
  {
    name: 'Thurs', fullDate: 'Nov 7th, 2019', words: 398,
  },
  {
    name: 'Fri', fullDate: 'Nov 8th, 2019', words: 480,
  },
  {
    name: 'Sat', fullDate: 'Nov 9th, 2019', words: 300,
  },
  {
    name: 'Sun', fullDate: 'Nov 10th, 2019', words: 400,
  }
];


function transformViewHistory(data, start, end, type) {

  let result = []; // for parsing mongo results
  let resultSet = []; // for stubbing out range of dates in filter

  let today = new Date().toLocaleString("en-US", {timeZone: "America/New_York"});

  // TODO - accept arguments for "start" and "end" instead of using range
  // let startDate = moment(new Date().valueOf() - ( 1000 * 60 * 60 * 24 * range ));

  let startDate = moment(new Date(start * 1000)).startOf("day");
  let endDate = moment(new Date(end * 1000)).startOf("day");

  // console.log("Start Date: ", startDate.format());
  // console.log("End Date: ", endDate.format());

  let range = endDate.diff(startDate, 'days');

  // console.log(range);

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

  // console.log(resultSet);

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

  // fetch view history by userId -- hard coded to show last 7 days
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
