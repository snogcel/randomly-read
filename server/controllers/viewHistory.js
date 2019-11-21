const { body, validationResult } = require('express-validator/check');
const ObjectId = require('mongodb').ObjectId;
const ViewHistory = require('../models/viewHistory');

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

exports.list = async (req, res) => {
  // const superuser = req.user.id; // TODO - remove?

  const id = req.params.id;
  const u_id = new ObjectId(id);

  let response = {};

  // fetch view history by userId -- hard coded to show last 7 days
  await ViewHistory.aggregate([
    { $match: {
        author: u_id,
        "created": {
          "$gte": new Date(new Date().valueOf() - ( 1000 * 60 * 60 * 24 * 7 ))
        }
      } },
    { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$created" } }, count: { $sum: 1 } } },
    { $sort: { _id: 1 } }
  ], function(err, data) {

    if(err) {
      response = {"error" : true, "message" : "Error fetching data"};
      res.json(response);
    } else {

      response = transformDataSet(data, "ViewHistory");
      res.json(response);

    }

  });

};
