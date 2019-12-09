const { body, validationResult } = require('express-validator/check');
const ObjectId = require('mongodb').ObjectId;
const Routine = require('../models/routine');
const User = require('../models/user');
const Post = require('../models/post');

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

const availableCharacters = [
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
  { id: "UH", name: "ʊ"},
  { id: "UW", name: "u"},
  { id: "B", name: "b"},
  { id: "CH", name: "tʃ"},
  { id: "D", name: "d"},
  { id: "DH", name: "ð"},
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
  { id: "ZH", name: "ʒ"}
];

async function generateSuggestedRoutine(userHistory) {

  if (userHistory === null) {
    return {vowels: [], consonants: []};
  } else {

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

    /*
    // for future use?
    let vowelStdDev = math.std(vowelCount);
    let consonantStdDev = math.std(consonantCount);

    let vowelMean = math.mean(vowelCount);
    let consonantMean = math.mean(consonantCount);
    */

    let vowels = [];
    let consonants = [];

    for (var key of Object.keys(userHistoryObj)) {

      if (key.indexOf("vowel_") >= 0) {
        for (let i = 0; i < userHistoryObj[key]; i++) {
          // if (userHistoryObj[key] >= vowelMean)
          vowels.push(key.split('_').pop());
        }
      }

      if (key.indexOf("consonant_") >= 0) {
        for (let i = 0; i < userHistoryObj[key]; i++) {
          // if (userHistoryObj[key] >= consonantMean)
          consonants.push(key.split('_').pop());
        }
      }

    }

    return {
      vowels: vowels,
      consonants: consonants
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

async function upVotedRoutines(author) {

  const category = "upvoted";
  const posts = await Post.find({ author: new ObjectId(author), category: category }).sort('-created');

  let name;
  let consonant;
  let vowel;
  let routines = [];

  // parse through posts to create upvoted routines

  for (let i = 0; i < posts.length; i++) {

    let syllables = [];

    // get similar word length
    if (posts[i].syllables === "1") syllables = ['1','2'];
    if (posts[i].syllables === "2") syllables = ['1','2'];
    if (posts[i].syllables === "3") syllables = ['1','2','3'];
    if (posts[i].syllables === "4") syllables = ['2','3','4'];
    if (posts[i].syllables === "5") syllables = ['3','4','5'];

    let subroutine = [{
      "index": Date.now(),
      "rangeVal": 5,
      "repetitions": 25,
      "mode": "Word",
      "isIntermission": false,
      "vowels": [posts[i].vowel],
      "consonants": [posts[i].consonant],
      "syllables": syllables, // posts[i].syllables
      "position": posts[i].position,
      "upvoted": true
    }];

    if (posts[i].consonant !== null) consonant = availableCharacters.find(o => o.id === posts[i].consonant);
    if (posts[i].vowel !== null) vowel = availableCharacters.find(o => o.id === posts[i].vowel);

    if (posts[i].position === "initial") name = "Words starting with " + consonant.name + " and " + vowel.name + " ('" + posts[i].title + "')";
    if (posts[i].position === "final") name = "Words ending with " + vowel.name + " and " + consonant.name + " ('" + posts[i].title + "')";

    routines.push({
      "id": posts[i]._id,
      "name": name,
      "subroutine": subroutine
    })

  }

  return routines;

}

exports.settings = async (req, res) => {

  const author = req.user.id;

  let obj = {};
  let parsedObj = {};

  let votedRoutines = await upVotedRoutines(author);

  // const userHistory = await UserHistoryInitial.findOne({"user": new ObjectId(author)});

  /*

  // disabling "Suggested Words" for now...

  let { vowels, consonants } = await generateSuggestedRoutine(userHistory); // if average or greater upvotes

  let id = author;
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
  */

  // fetch user by ID
  await User.findOne({"_id": new ObjectId(author)}, function(err, data) {

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

      for (let i = 0; i < votedRoutines.length; i++) {
        data.push(votedRoutines[i]);
      }

    // include suggested routines
    /*
    data.unshift({
      "id": id,
      "name": name,
      "subroutine": subroutine
    });
    */

    if (err) {
      response = {"error": true, "message": "Error fetching data"};
      res.json(response);
    } else {
      response = transformRoutineSet(data, "routines");
      res.json(response);
    }

    });

  });

};
