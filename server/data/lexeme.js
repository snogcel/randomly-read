const Post = require('../models/post');
const ViewHistory = require('../models/viewHistory');

const Lexeme = function(data, position, id) {

  let dataValues = {};

  if (data.length > 0) {
    dataValues = data[0].dataValues;
  }

  this.cmudict_id = dataValues.cmudict_id;
  this.wordid = dataValues.wordid;

  this.lexeme = dataValues.lexeme;
  this.consonant = dataValues.consonant;
  this.vowel = dataValues.vowel;
  this.position = position;
  this.type = dataValues.type;
  this.subtype = dataValues.subtype;
  this.syllables = dataValues.syllables;
  this.wordsXsensesXsynsets = dataValues.wordsXsensesXsynsets;
  this.category = "words";

  this.author = id;

};

Lexeme.prototype.submitViewHistory = function(postId) {

  ViewHistory.create({
    "author": this.author,
    "postId": postId,
    "title": this.lexeme,
    "cmudict_id": this.cmudict_id,
    "consonant": this.consonant,
    "vowel": this.vowel,
    "syllables": this.syllables,
  });

};

Lexeme.prototype.submitPost = function() {

  let lexeme = this.lexeme;

  console.log("writing to mongodb: ", lexeme);

  return Post.create({
    cmudict_id: this.cmudict_id,
    title: this.lexeme,
    author: this.author,
    category: this.category,
    text: "debug info: [ " + this.consonant + " ] + [ " + this.vowel + "] using " + this.position + " matching.",
    consonant: this.consonant,
    vowel: this.vowel,
    position: this.position,
    syllables: this.syllables,
  }).then(null, function(err) {
    if (err.code === 11000) {

      console.log("fetching: ", lexeme);

      return Post.findOne({title:lexeme}).lean().exec();

    } else {
      throw err;
    }
  });
};

Lexeme.prototype.submitPostAsync = function() {

  let lexeme = this.lexeme;

  console.log("writing to mongodb: ", lexeme);

  return Post.create({
    cmudict_id: this.cmudict_id,
    title: this.lexeme,
    author: this.author,
    category: this.category,
    text: "debug info: [ " + this.consonant + " ] + [ " + this.vowel + "] using " + this.position + " matching.",
    consonant: this.consonant,
    vowel: this.vowel,
    position: this.position,
    syllables: this.syllables,
  }).then(null, function(err) {
    if (err.code === 11000) {

      console.log("fetching: ", lexeme);

      /*

      // TODO - increment view count using something like the following:

      const post = await Post.findByIdAndUpdate(
        req.post.id,
        { $inc: { views: 1 } },
        { new: true }
      );

       */

      return Post.findOne({title:lexeme}).lean().exec();

    } else {
      throw err;
    }
  });
};

module.exports = Lexeme;
