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

};

Lexeme.prototype.createPost = function() {

  Post.create({
    title: this.lexeme,
    author: '5ccf8c65debb7576d5bdd451',
    category: this.category,
    type: 'text',
    text: JSON.stringify(this.wordsXsensesXsynsets)
  });

};

module.exports = Lexeme;
