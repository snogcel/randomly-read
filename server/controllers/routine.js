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
  { id: "AA", name: "ɑ", example: "b<u>o</u>t"},
  { id: "AE", name: "æ", example: "b<u>a</u>t"},
  { id: "AH", name: "ʌ", example: "wh<u>a</u>t"},
  { id: "AO", name: "ɔ", example: "st<u>o</u>ry"},
  { id: "AW", name: "aʊ", example: "b<u>ou</u>t"},
  { id: "AY", name: "aɪ", example: "b<u>i</u>te"},
  { id: "EH", name: "ɛ", example: "b<u>e</u>t"},
  { id: "ER", name: "ɝ", example: "b<u>i</u>rd"},
  { id: "EY", name: "eɪ", example: "b<u>ai</u>t"},
  { id: "IH", name: "ɪ", example: "b<u>i</u>t"},
  { id: "IY", name: "i", example: "b<u>ea</u>t"},
  { id: "OW", name: "oʊ", example: "b<u>oa</u>t"},
  { id: "OY", name: "ɔɪ", example: "b<u>oy</u>"},
  { id: "UH", name: "ʊ", example: "b<u>oo</u>k"},
  { id: "UW", name: "u", example: "b<u>oo</u>t"},
  { id: "B", name: "b", example: "<u>b</u>uy"},
  { id: "CH", name: "tʃ", example: "<u>ch</u>ild"},
  { id: "D", name: "d", example: "<u>d</u>ate"},
  { id: "DH", name: "ð", example: "<u>th</u>y"},
  { id: "F", name: "f", example: "<u>f</u>ight"},
  { id: "G", name: "g", example: "<u>g</u>uy"},
  { id: "HH", name: "h", example: "<u>h</u>eight"},
  { id: "JH", name: "dʒ", example: "<u>j</u>ive"},
  { id: "K", name: "k", example: "<u>k</u>ite"},
  { id: "L", name: "l", example: "<u>l</u>ie"},
  { id: "M", name: "m", example: "<u>m</u>y"},
  { id: "N", name: "n", example: "<u>n</u>ear"},
  { id: "P", name: "p", example: "<u>p</u>ie"},
  { id: "R", name: "ɹ", example: "<u>r</u>ye"},
  { id: "S", name: "s", example: "<u>s</u>igh"},
  { id: "SH", name: "ʃ", example: "<u>sh</u>y"},
  { id: "T", name: "t", example: "<u>t</u>ie"},
  { id: "TH", name: "θ", example: "<u>th</u>igh"},
  { id: "V", name: "v", example: "<u>v</u>ie"},
  { id: "W", name: "w", example: "<u>w</u>ise"},
  { id: "Y", name: "j", example: "<u>y</u>acht"},
  { id: "Z", name: "Z", example: "<u>z</u>oo"},
  { id: "ZH", name: "ʒ", example: "plea<u>s</u>ure"}
];

const defaultRoutines = [
  {
    "id": "rand_words",
    "name": "25 Random Words",
    "description": "",
    "subroutine": [{
      "index": Date.now(),
      "rangeVal": 5,
      "repetitions": 25,
      "mode": "Word",
      "isIntermission": false,
      "vowels": [],
      "consonants": [],
      "syllables": [],
      "position": "initial"
    }]
  },
  {
    "id": "rand_sentences",
    "name": "25 Random Sentences",
    "description": "",
    "subroutine": [{
      "index": Date.now(),
      "rangeVal": 5,
      "repetitions": 25,
      "mode": "Sentence",
      "isIntermission": false,
      "vowels": [],
      "consonants": [],
      "syllables": [],
      "position": "initial"
    }]
  }
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
  let description;
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
      "repetitions": 10,
      "mode": "Word",
      "isIntermission": false,
      "vowels": [posts[i].vowel],
      "consonants": [posts[i].consonant],
      "syllables": syllables, // posts[i].syllables
      "position": posts[i].position
    },{
      "index": Date.now(),
      "rangeVal": 5,
      "repetitions": 10,
      "mode": "Word",
      "isIntermission": false,
      "vowels": [],
      "consonants": [posts[i].consonant],
      "syllables": syllables, // posts[i].syllables
      "position": posts[i].position
    },
    {
      "index": Date.now(),
      "rangeVal": 5,
      "repetitions": 10,
      "mode": "Word",
      "isIntermission": false,
      "vowels": [posts[i].vowel],
      "consonants": [],
      "syllables": syllables, // posts[i].syllables
      "position": posts[i].position
    }];

    if (posts[i].consonant !== null) consonant = availableCharacters.find(o => o.id === posts[i].consonant);
    if (posts[i].vowel !== null) vowel = availableCharacters.find(o => o.id === posts[i].vowel);

    if (posts[i].position === "initial") {
      name = "Words similar to '" + posts[i].title + "'";
      description = "This routine is based on the opening sounds of the word <strong>" + posts[i].title + "</strong>. The words that will be displayed to you will focus on the consonant <strong>" + consonant.name + "</strong> (e.g. '" + consonant.example + "') and the vowel <strong>" + vowel.name + "</strong> (e.g. '" + vowel.example + "').";
    }
    if (posts[i].position === "final") {
      name = "Word similar to '" + posts[i].title + "'";
      description = "This routine is based on the ending sounds of the word <strong>" + posts[i].title + "</strong>. The words that will be displayed to you will focus on the vowel <strong>" + vowel.name + "</strong> (e.g. '" + vowel.example + "') and the consonant <strong>" + consonant.name + "</strong> (e.g. '" + consonant.example + "').";
    }

    routines.push({
      "id": posts[i]._id,
      "name": name,
      "description": description,
      "upvoted": true,
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

      // if no routines assigned, load with defaults
      if (data.length === 0) {
        for (let i = 0; i < defaultRoutines.length; i++) {
          data.push(defaultRoutines[i]);
        }
      }

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
