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
    "id": "full_humdronian",
    "subroutine" : [ { "index" : 1577416034435, "rangeVal" : 5, "repetitions" : 5, "mode" : "Word", "isIntermission" : false, "vowels" : [ "AA" ], "consonants" : [ ], "syllables" : [ 1, 2 ], "position" : "initial" }, { "index" : 1577416034437, "rangeVal" : 5, "repetitions" : 5, "mode" : "Word", "isIntermission" : false, "vowels" : [ "AE" ], "consonants" : [ ], "syllables" : [ 1, 2 ], "position" : "initial" }, { "index" : 1577416034438, "rangeVal" : 5, "repetitions" : 5, "mode" : "Word", "isIntermission" : false, "vowels" : [ "AH" ], "consonants" : [ ], "syllables" : [ 1, 2 ], "position" : "initial" }, { "index" : 1577416034440, "rangeVal" : 5, "repetitions" : 5, "mode" : "Word", "isIntermission" : false, "vowels" : [ "AO" ], "consonants" : [ ], "syllables" : [ 1, 2 ], "position" : "initial" }, { "index" : 1577416034441, "rangeVal" : 5, "repetitions" : 5, "mode" : "Word", "isIntermission" : false, "vowels" : [ "AW" ], "consonants" : [ ], "syllables" : [ 2, 1 ], "position" : "initial" }, { "index" : 1577416034442, "rangeVal" : 5, "repetitions" : 5, "mode" : "Word", "isIntermission" : false, "vowels" : [ "AY" ], "consonants" : [ ], "syllables" : [ 1, 2 ], "position" : "initial" }, { "index" : 1577416034443, "rangeVal" : 5, "repetitions" : 5, "mode" : "Word", "isIntermission" : false, "vowels" : [ "EH" ], "consonants" : [ ], "syllables" : [ 1, 2 ], "position" : "initial" }, { "index" : 1577416034444, "rangeVal" : 5, "repetitions" : 5, "mode" : "Word", "isIntermission" : false, "vowels" : [ "ER" ], "consonants" : [ ], "syllables" : [ 1, 2 ], "position" : "initial" }, { "index" : 1577416034446, "rangeVal" : 5, "repetitions" : 5, "mode" : "Word", "isIntermission" : false, "vowels" : [ "EY" ], "consonants" : [ ], "syllables" : [ 1, 2 ], "position" : "initial" }, { "index" : 1577416034447, "rangeVal" : 5, "repetitions" : 5, "mode" : "Word", "isIntermission" : false, "vowels" : [ "IH" ], "consonants" : [ ], "syllables" : [ 1, 2 ], "position" : "initial" }, { "index" : 1577416034448, "rangeVal" : 5, "repetitions" : 5, "mode" : "Word", "isIntermission" : false, "vowels" : [ "IY" ], "consonants" : [ ], "syllables" : [ 1, 2 ], "position" : "initial" }, { "index" : 1577416034449, "rangeVal" : 5, "repetitions" : 5, "mode" : "Word", "isIntermission" : false, "vowels" : [ "OW" ], "consonants" : [ ], "syllables" : [ 1, 2 ], "position" : "initial" }, { "index" : 1577416034450, "rangeVal" : 5, "repetitions" : 5, "mode" : "Word", "isIntermission" : false, "vowels" : [ "OY" ], "consonants" : [ ], "syllables" : [ 1, 2 ], "position" : "initial" }, { "index" : 1577416034451, "rangeVal" : 5, "repetitions" : 5, "mode" : "Word", "isIntermission" : false, "vowels" : [ "UH" ], "consonants" : [ ], "syllables" : [ 1, 2 ], "position" : "initial" }, { "index" : 1577416034452, "rangeVal" : 5, "repetitions" : 5, "mode" : "Word", "isIntermission" : false, "vowels" : [ "UW" ], "consonants" : [ ], "syllables" : [ 1, 2 ], "position" : "initial" } ], "name" : "Full Humdronian Routine", "__v" : 0, "description" : "\"<div>The following exercise is intended to get you accustomed to using <strong>Full Humdronian Speech</strong>, and will sound somewhat weird at first. The idea is for you to create a humming type sound which resonates through your nasal cavities while simply mouthing the words. </div><br/><div>The steps for performing this type of breathing are as follows:</div><ol><li>Push out your stomach to draw in air through your nose. Your stomach and the muscles located towards the bottom of your stomach will begin to tense slightly as you reach the top of your breath.</li><li>Begin to exhale through your nose while remaining mindful not to pause between breaths. Completely relax your pelvic muscles as you exhale.</li><li>Place your index finger against your right nostril and feel the vibration as you begin to create a <em>droning </em>sound through your nose.</li><li>Mouth the word with your lips using this “droning” sound to complete each word (think of the word &quot;<em>mmmmmm</em>&quot;).</li><li>Pinch your thumb and middle finger as you focus on the vowel sound of each word, ignoring the opening consonant.</li></ol>\""
  },
  {
    "id": "transition_humdronian",
    "subroutine" : [ { "index" : 1577416120641, "rangeVal" : 8, "repetitions" : 3, "mode" : "Word", "isIntermission" : false, "vowels" : [ "AA" ], "consonants" : [ ], "syllables" : [ 1, 2, 3 ], "position" : "initial" }, { "index" : 1577416490897, "rangeVal" : 8, "repetitions" : 3, "mode" : "Word", "isIntermission" : false, "vowels" : [ "AE" ], "consonants" : [ ], "syllables" : [ 1, 2, 3 ], "position" : "initial" }, { "index" : 1577416537136, "rangeVal" : 8, "repetitions" : 3, "mode" : "Word", "isIntermission" : false, "vowels" : [ "AH" ], "consonants" : [ ], "syllables" : [ 1, 2, 3 ], "position" : "initial" }, { "index" : 1577416553899, "rangeVal" : 8, "repetitions" : 3, "mode" : "Word", "isIntermission" : false, "vowels" : [ "AO" ], "consonants" : [ ], "syllables" : [ 1, 2, 3 ], "position" : "initial" }, { "index" : 1577416567644, "rangeVal" : 8, "repetitions" : 3, "mode" : "Word", "isIntermission" : false, "vowels" : [ "AW" ], "consonants" : [ ], "syllables" : [ 1, 2, 3 ], "position" : "initial" }, { "index" : 1577416582408, "rangeVal" : 8, "repetitions" : 3, "mode" : "Word", "isIntermission" : false, "vowels" : [ "AY" ], "consonants" : [ ], "syllables" : [ 1, 2, 3 ], "position" : "initial" }, { "index" : 1577416598070, "rangeVal" : 8, "repetitions" : 3, "mode" : "Word", "isIntermission" : false, "vowels" : [ "EH" ], "consonants" : [ ], "syllables" : [ 1, 2, 3 ], "position" : "initial" }, { "index" : 1577416616106, "rangeVal" : 8, "repetitions" : 3, "mode" : "Word", "isIntermission" : false, "vowels" : [ "ER" ], "consonants" : [ ], "syllables" : [ 1, 2, 3 ], "position" : "initial" }, { "index" : 1577416629266, "rangeVal" : 8, "repetitions" : 3, "mode" : "Word", "isIntermission" : false, "vowels" : [ "EY" ], "consonants" : [ ], "syllables" : [ 1, 2, 3 ], "position" : "initial" }, { "index" : 1577416643519, "rangeVal" : 8, "repetitions" : 3, "mode" : "Word", "isIntermission" : false, "vowels" : [ "IH" ], "consonants" : [ ], "syllables" : [ 1, 2, 3 ], "position" : "initial" }, { "index" : 1577416657808, "rangeVal" : 8, "repetitions" : 3, "mode" : "Word", "isIntermission" : false, "vowels" : [ "IY" ], "consonants" : [ ], "syllables" : [ 1, 2, 3 ], "position" : "initial" }, { "index" : 1577416671811, "rangeVal" : 8, "repetitions" : 3, "mode" : "Word", "isIntermission" : false, "vowels" : [ "OW" ], "consonants" : [ ], "syllables" : [ 1, 2, 3 ], "position" : "initial" }, { "index" : 1577416688327, "rangeVal" : 8, "repetitions" : 3, "mode" : "Word", "isIntermission" : false, "vowels" : [ "OY" ], "consonants" : [ ], "syllables" : [ 1, 2, 3 ], "position" : "initial" }, { "index" : 1577416703681, "rangeVal" : 8, "repetitions" : 3, "mode" : "Word", "isIntermission" : false, "vowels" : [ "UH" ], "consonants" : [ ], "syllables" : [ 1, 2, 3 ], "position" : "initial" }, { "index" : 1577416717744, "rangeVal" : 8, "repetitions" : 3, "mode" : "Word", "isIntermission" : false, "vowels" : [ "UW" ], "consonants" : [ ], "syllables" : [ 1, 2, 3 ], "position" : "initial" } ], "name" : "Transitional Humdronian Routine", "__v" : 0, "description" : "\"<div>This is a follow-up to the <strong>Humdronian Speech</strong> exercise and will be referred to as <strong>Transitional Humdronian Speech</strong>. This exercise is intended to get you accustomed to transitioning the voicing of words from your nasal cavities to your layrnx. </div><br/><div>The idea is for you to create a humming type sound which resonates through your nasal cavities while simply mouthing the words, and then transitioning to that sound coming through your vocal chords fully. </div><br/><div>The steps for performing this type of breathing are as follows:</div><ol><li>Push out your stomach to draw in air through your nose. Your stomach and the muscles located towards the bottom of your stomach will begin to tense slightly as you reach the top of your breath.</li><li>Begin to exhale through your nose while remaining mindful not to pause between breaths. Completely relax your pelvic muscles as you exhale.</li><li>Place your index finger against your right nostril and feel the vibration as you begin to create a <em>droning </em>sound through your nose.</li><li>Mouth the word with your lips using this “droning” sound to complete each word (think of the word &quot;<em>mmmmmm</em>&quot;).</li><li>Pinch your thumb and middle finger as you focus on the vowel sound of each word, and as you speak the word allow the phonation to transition from your nasal cavities to your throat.</li></ol><div>Repeat each word twice, the first time using the <strong>Humdronian Speech</strong> technique and the second time using <strong>Transitional Humdronian Speech</strong>.</div>\""
  },
  {
    "id": "resonant_humdronian",
    "subroutine" : [ { "index" : 1577416992979, "rangeVal" : 6, "repetitions" : 3, "mode" : "Sentence", "isIntermission" : false, "vowels" : [ "AA" ], "consonants" : [ ], "syllables" : [ 1, 2, 3 ], "position" : "initial" }, { "index" : 1577417249551, "rangeVal" : 6, "repetitions" : 3, "mode" : "Sentence", "isIntermission" : false, "vowels" : [ "AE" ], "consonants" : [ ], "syllables" : [ 1, 2, 3 ], "position" : "initial" }, { "index" : 1577417273684, "rangeVal" : 6, "repetitions" : 3, "mode" : "Sentence", "isIntermission" : false, "vowels" : [ "AH" ], "consonants" : [ ], "syllables" : [ 1, 2, 3 ], "position" : "initial" }, { "index" : 1577417286594, "rangeVal" : 6, "repetitions" : 3, "mode" : "Sentence", "isIntermission" : false, "vowels" : [ "AO" ], "consonants" : [ ], "syllables" : [ 1, 2, 3 ], "position" : "initial" }, { "index" : 1577417299084, "rangeVal" : 6, "repetitions" : 3, "mode" : "Sentence", "isIntermission" : false, "vowels" : [ "AW" ], "consonants" : [ ], "syllables" : [ 1, 2, 3 ], "position" : "initial" }, { "index" : 1577417310267, "rangeVal" : 6, "repetitions" : 3, "mode" : "Sentence", "isIntermission" : false, "vowels" : [ "AY" ], "consonants" : [ ], "syllables" : [ 1, 2, 3 ], "position" : "initial" }, { "index" : 1577417318466, "rangeVal" : 6, "repetitions" : 3, "mode" : "Sentence", "isIntermission" : false, "vowels" : [ "EH" ], "consonants" : [ ], "syllables" : [ 1, 2, 3 ], "position" : "initial" }, { "index" : 1577417340778, "rangeVal" : 6, "repetitions" : 3, "mode" : "Sentence", "isIntermission" : false, "vowels" : [ "ER" ], "consonants" : [ ], "syllables" : [ 1, 2, 3 ], "position" : "initial" }, { "index" : 1577417353827, "rangeVal" : 6, "repetitions" : 3, "mode" : "Sentence", "isIntermission" : false, "vowels" : [ "EY" ], "consonants" : [ ], "syllables" : [ 1, 2, 3 ], "position" : "initial" }, { "index" : 1577417369123, "rangeVal" : 6, "repetitions" : 3, "mode" : "Sentence", "isIntermission" : false, "vowels" : [ "IH" ], "consonants" : [ ], "syllables" : [ 1, 2, 3 ], "position" : "initial" }, { "index" : 1577417388248, "rangeVal" : 6, "repetitions" : 3, "mode" : "Sentence", "isIntermission" : false, "vowels" : [ "IY" ], "consonants" : [ ], "syllables" : [ 1, 2, 3 ], "position" : "initial" }, { "index" : 1577417405041, "rangeVal" : 6, "repetitions" : 3, "mode" : "Sentence", "isIntermission" : false, "vowels" : [ "OW" ], "consonants" : [ ], "syllables" : [ 1, 2, 3 ], "position" : "initial" }, { "index" : 1577417418124, "rangeVal" : 6, "repetitions" : 3, "mode" : "Sentence", "isIntermission" : false, "vowels" : [ "OY" ], "consonants" : [ ], "syllables" : [ 1, 2, 3 ], "position" : "initial" }, { "index" : 1577417429842, "rangeVal" : 6, "repetitions" : 3, "mode" : "Sentence", "isIntermission" : false, "vowels" : [ "UH" ], "consonants" : [ ], "syllables" : [ 1, 2, 3 ], "position" : "initial" }, { "index" : 1577417441824, "rangeVal" : 6, "repetitions" : 3, "mode" : "Sentence", "isIntermission" : false, "vowels" : [ "UW" ], "consonants" : [ ], "syllables" : [ 1, 2, 3 ], "position" : "initial" } ], "name" : "Resonant Humdronian Speech", "__v" : 0, "description" : "\"<div>The final step after the <strong>Transitional Humdronian Speech</strong> exercise and will be referred to as <strong>Resonant Humdronian Speech</strong>. This exercise is intended to get you accustomed to transitioning the voicing of words from your nasal cavities to your layrnx in an almost imperceptible way. </div><br/><div>The idea is for you to create a humming type sound which resonates through your nasal cavities at the initial onset of the sentence, and to quickly transition that sound to your vocal chords. With enough practice it will feel like the word only begins with a very short &quot;<em>hmm</em>&quot; and that your speech sounds natural. Try to keep your breathing steady through the entire sentence.</div><br/><div>The steps for performing this type of breathing are as follows:</div><ol><li>Push out your stomach to draw in air through your nose. Your stomach and the muscles located towards the bottom of your stomach will begin to tense slightly as you reach the top of your breath.</li><li>Begin to exhale through your nose while remaining mindful not to pause between breaths. Completely relax your pelvic muscles as you exhale.</li><li>Pinch your thumb and middle finger as you focus on the vowel sound of each word, and as you speak the sentence allow the your voice to transition from your nasal cavities to your throat while smoothly sailing through the entire sentence.</li></ol>\""
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

  function GetSortOrder(prop) {
    return function(a, b) {
      if (a[prop] > b[prop]) {
        return 1;
      } else if (a[prop] < b[prop]) {
        return -1;
      }
      return 0;
    }
  }

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
      description = "This routine is based on the beginning of the word <strong>" + posts[i].title + "</strong>. The words that will be displayed to you will focus on the consonant <strong>" + consonant.name + "</strong> (e.g. '" + consonant.example + "') and the vowel <strong>" + vowel.name + "</strong> (e.g. '" + vowel.example + "').";
    }
    if (posts[i].position === "final") {
      name = "Words similar to '" + posts[i].title + "'";
      description = "This routine is based on the ending of the word <strong>" + posts[i].title + "</strong>. The words that will be displayed to you will focus on the vowel <strong>" + vowel.name + "</strong> (e.g. '" + vowel.example + "') and the consonant <strong>" + consonant.name + "</strong> (e.g. '" + consonant.example + "').";
    }

    routines.push({
      "id": posts[i]._id,
      "name": name,
      "description": description,
      "upvoted": true,
      "subroutine": subroutine
    })

  }

  routines.sort(GetSortOrder("description"));

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
