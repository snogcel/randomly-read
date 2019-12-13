const { body, validationResult } = require('express-validator/check');
const ObjectId = require('mongodb').ObjectId;
const User = require('../models/user');
const Post = require('../models/post');
const Interaction = require('../models/interaction');
const interactionSettings = require('../models/interactionSettings');
const VoteHistory = require('../models/voteHistory');
const UserHistoryInitial = require('../models/userHistoryInitial');

const Word = require('../data/connectors');
const Lexeme = require('../data/lexeme');

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

async function attemptInteractionEntry(author, word, position) {

  let filter = {};
  let limit = 1; // default

  const id = author; // get user id

  // Parse Parameters
  if (typeof word !== 'undefined') filter.lexeme = word;

  // Fetch Query Data
  return new Promise((resolve, reject) => {
    Word[position].findAll({ where: filter, limit: limit }).then(function(data) {

      if (data.length === 0) {
        resolve(null);
      } else {

        let queryResult = data;

        let lexeme = new Lexeme(queryResult, position, id);

        lexeme.score = 1;

        lexeme.submitPost().then(function(doc) {

          // TODO - handle empty doc
          queryResult[0].dataValues.id = doc._id; // mongo id of post
          queryResult[0].votes = doc.votes;
          queryResult[0].score = doc.score;

          lexeme.id = doc._id;
          lexeme.votes = doc.votes;
          lexeme.score = doc.score;

          resolve(lexeme);

        }, function(err) { resolve(null); });

      }

    });
  });

}

exports.create = async (req, res, next) => {

  const result = validationResult(req);
  if (!result.isEmpty()) {
    const errors = result.array({ onlyFirstError: true });
    return res.status(422).json({ errors });
  }

  try {
    const author = req.user.id;
    const ease = req.body.ease;
    const position = req.body.position;

    let word = req.body.word;
    let consonant = null;
    let vowel = null;
    let postId = null;

    // Attempt lookup in cmudict
    let interactionEntry = await attemptInteractionEntry(author, word, position);

    if (interactionEntry) {

      word = interactionEntry.lexeme; // normal capitalization of word

      let post = await Post.findById(interactionEntry.id);

      postId = post.id; // include post id in response
      consonant = post.consonant; // include consonant
      vowel = post.vowel; // include vowel in response

      if (ease < 50 && post.score < 1) {
        post.vote(author, 1);

        // record vote
        VoteHistory.create({
          "author": post.author._id,
          "title": post.title,
          "cmudict_id": post.cmudict_id,
          "score": post.score,
          "consonant": post.consonant,
          "vowel": post.vowel,
          "syllables": post.syllables
        });

        // let vowel = "vowel_"+post.vowel;
        // let consonant = "consonant_"+post.consonant;

        // test for initial / medial / final and record to given User History model -- remove?
        // let result = await UserHistoryInitial.update({user: post.author.id},{ $inc: {[vowel]: 1, [consonant]: 1} }, {upsert: true});

      }

      if (ease > 50 && post.score > -1) {
        post.vote(author, -1);

        // record vote
        VoteHistory.create({
          "author": post.author._id,
          "title": post.title,
          "cmudict_id": post.cmudict_id,
          "score": post.score,
          "consonant": post.consonant,
          "vowel": post.vowel,
          "syllables": post.syllables
        });

        // let vowel = "vowel_"+post.vowel;
        // let consonant = "consonant_"+post.consonant;

        // test for initial / medial / final and record to given User History model -- remove?
        // let result = await UserHistoryInitial.update({user: post.author.id},{ $inc: {[vowel]: -1, [consonant]: -1} }, {upsert: true});
      }

    }

    const interaction = await Interaction.create({
      author,
      postId,
      word,
      ease,
      position,
      consonant,
      vowel
    }).catch(function(err) {

      if (err.code === 11000) {
        let response = {"error" : true, "message" : "Duplicate Word"};
        return res.status(422).json(response);
      } else {
        return res.status(422).json(err.message);
      }

    });

    res.status(201).json(interaction);

  } catch (err) {
    next(err);
  }

};

exports.list = async (req, res) => {
  const author = req.user.id;
  const a_id = new ObjectId(author);
  const interactions =  await Interaction.find({"author":a_id,"createdAt":{$gt:new Date(Date.now() - (12 * 60* 60 * 1000 * 7))}}).sort({"createdAt":-1});
  res.json(interactions);
};


exports.settings = async (req, res) => {
  const author = req.user.id;
  const a_id = new ObjectId(author);

  let assigned = [];

  // fetch user by ID
  await User.findOne({"_id": a_id}, function(err, data) {

    if(err) {
      response = {"error" : true, "message" : "Error fetching data"};
      res.json(response);
    } else {
      let obj = JSON.parse(JSON.stringify(data));
      assigned = obj.interactionSettings;
    }

  });

  let response = {};

  interactionSettings.find({
    '_id': {$in: assigned}
  }, function (err, data) {

    if (err) {
      response = {"error": true, "message": "Error fetching data"};
      res.json(response);
    } else {
      response = transformRoutineSet(data, "interactionSettings");
      res.json(response);
    }

  });

};

exports.delete = async (req, res) => {
  const interactionId = req.params.id;
  const o_id = new ObjectId(interactionId);

  let response = {};

  let interaction = await Interaction.findById(interactionId);

  let post = await Post.findById(interaction.postId);

  // if post exists, remove upvote / downvote
  if (post) {
    if (interaction.ease <= 50) {
      post.vote(post.author, -1); // downvote

      // record vote
      VoteHistory.create({
        "author": post.author._id,
        "title": post.title,
        "cmudict_id": post.cmudict_id,
        "score": post.score,
        "consonant": post.consonant,
        "vowel": post.vowel,
        "syllables": post.syllables
      });

      // let vowel = "vowel_"+post.vowel;
      // let consonant = "consonant_"+post.consonant;

      // test for initial / medial / final and record to given User History model
      // let result = await UserHistoryInitial.update({user: post.author.id},{ $inc: {[vowel]: -1, [consonant]: -1} }, {upsert: true});

    }

    if (interaction.ease > 50) {
      post.vote(post.author, -1); // downvote

      // record vote
      VoteHistory.create({
        "author": post.author._id,
        "title": post.title,
        "cmudict_id": post.cmudict_id,
        "score": post.score,
        "consonant": post.consonant,
        "vowel": post.vowel,
        "syllables": post.syllables
      });

      // let vowel = "vowel_"+post.vowel;
      // let consonant = "consonant_"+post.consonant;

      // test for initial / medial / final and record to given User History model
      // let result = await UserHistoryInitial.update({user: post.author.id},{ $inc: {[vowel]: 1, [consonant]: 1} }, {upsert: true});
    }
  }

  await Interaction.remove({"_id": o_id}, function(err, data) {

    if(err) {
      response = {"error" : true, "message" : "Error deleting data"};
      res.json(response);
    } else {

      console.log(data);

      res.json({ message: 'success' });
    }

  });
};

// TODO - remove

exports.listby24hrs = async (req, res) => {
  const interactions = await Interaction.find({"createdAt":{$gt:new Date(Date.now() - 24 * 60* 60 * 1000)}})
  res.json(interactions)
}

exports.listbyWeek = async (req, res) => {
  const interactions = await Interaction.find({"createdAt":{$gt:new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)}})
  res.json(interactions)
}
let d = new Date();
exports.listbyMonth = async (req, res) => {
  const interactions = await Interaction.find({"createdAt":{$gt:new Date(d.setMonth(d.getMonth() - 1))}})
  res.json(interactions)
}

exports.listby3Months = async (req, res) => {
  const interactions = await Interaction.find({"createdAt":{$gt:new Date(d.setMonth(d.getMonth() - 1 * 3))}})
  res.json(interactions)
}
