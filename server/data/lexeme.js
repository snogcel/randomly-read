const Post = require('../models/post');

const Lexeme = function(data) {

  // TODO - Validate / Error Check
  let dataValues = data[0].dataValues;

  this.cmudict_id = dataValues.cmudict_id;
  this.wordid = dataValues.wordid;

  this.lexeme = dataValues.lexeme;
  this.consonant = dataValues.consonant;
  this.vowel = dataValues.vowel;
  this.type = dataValues.type;
  this.subtype = dataValues.subtype;
  this.syllables = dataValues.syllables;
  this.wordsXsensesXsynsets = dataValues.wordsXsensesXsynsets;

  if (this.type === 'noun') this.category = 'nouns';
  if (this.type === 'verb') this.category = 'verbs';
  if (this.type === 'adj') this.category = 'adjectives';
  if (this.type === 'adv') this.category = 'adverbs';

  this.author = '5ccf8c65debb7576d5bdd451';
  this.post_type = 'text';
  this.post_text = JSON.stringify(this.wordsXsensesXsynsets);

};

Lexeme.prototype.createPost = function(cb) {
  saveNewPost(
    this.lexeme,
    this.author,
    this.category,
    this.post_type,
    this.post_text
  ).then(function(doc) {

    cb(null, doc); // success

  }, function(err) {

    cb(err, null); // failure
    
  });
};

function saveNewPost(title, author, category, post_type, post_text) {
  return Post.create({
    title: title,
    author: author,
    category: category,
    type: post_type,
    text: post_text
  }).then(null, function(err) {
    if (err.code === 11000) {
      return Post.findOne({title:title}).exec()
    } else {
      throw err;
    }
  });
}

module.exports = Lexeme;
