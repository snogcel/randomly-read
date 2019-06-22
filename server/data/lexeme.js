const Post = require('../models/post');

const Lexeme = function(data) {

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

};

Lexeme.prototype.submitPost = function() {

  let lexeme = this.lexeme;

  console.log("writing to mongodb: ", lexeme);

  return Post.create({
    cmudict_id: this.cmudict_id,
    title: this.lexeme,
    author: this.author,
    category: this.category,
    text: JSON.stringify(this.wordsXsensesXsynsets),
    consonant: this.consonant,
    vowel: this.vowel,
    syllables: this.syllables
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

      return Post.findOne({title:lexeme}).exec();

    } else {
      throw err;
    }
  });
};

module.exports = Lexeme;
