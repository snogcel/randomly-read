const { body, validationResult } = require('express-validator/check');
const Post = require('../models/post');
const User = require('../models/user');
const VoteHistory = require('../models/voteHistory');
const UserHistoryInitial = require('../models/userHistoryInitial');

exports.load = async (req, res, next, id) => {
  try {
    req.post = await Post.findById(id);
    if (!req.post) return res.status(404).json({ message: 'post not found' });
  } catch (err) {
    if (err.name === 'CastError')
      return res.status(400).json({ message: 'invalid post id' });
    return next(err);
  }
  next();
};

exports.show = async (req, res) => {
  const post = await Post.findByIdAndUpdate(
    req.post.id,
    { $inc: { views: 1 } },
    { new: true }
  );
  res.json(post);
};

exports.list = async (req, res) => {
  const posts = await Post.find().sort('-score');
  res.json(posts);
};

exports.listByCategory = async (req, res) => {
  const category = req.params.category;
  const posts = await Post.find({ category }).sort('-score');
  res.json(posts);
};

exports.listByUser = async (req, res) => {
  const username = req.params.user;
  const author = await User.findOne({ username });
  const posts = await Post.find({ author: author.id, score: 1 }).sort('-created');
  res.json(posts);
};

exports.create = async (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const errors = result.array({ onlyFirstError: true });
    return res.status(422).json({ errors });
  }

  try {
    const { title, url, category, type, text } = req.body;
    const author = req.user.id;
    const post = await Post.create({
      title,
      url,
      author,
      category,
      type,
      text
    });
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
};

const titleIsValid = body('title')
  .exists()
  .withMessage('is required')

  .isLength({ min: 1 })
  .withMessage('cannot be blank')

  .isLength({ max: 100 })
  .withMessage('must be at most 100 characters long')

  .custom(value => value.trim() === value)
  .withMessage('cannot start or end with whitespace');

const urlOrTextIsValid = (req, res, next) => {
  if (req.body.type === 'link') {
    const chain = body('url')
      .exists()
      .withMessage('is required')

      .isURL()
      .withMessage('is invalid');

    chain(req, res, next);
  } else {
    const chain = body('text')
      .exists()
      .withMessage('is required')

      .isLength({ min: 4 })
      .withMessage('must be at least 4 characters long');

    chain(req, res, next);
  }
};

const typeIsValid = body('type')
  .exists()
  .withMessage('is required')

  .isIn(['link', 'text'])
  .withMessage('must be a link or text post');

const categoryIsValid = body('category')
  .exists()
  .withMessage('is required')

  .isLength({ min: 1 })
  .withMessage('cannot be blank');

exports.validate = [
  titleIsValid,
  urlOrTextIsValid,
  categoryIsValid,
  typeIsValid
];

exports.upvote = async (req, res) => {
  const post = await req.post.vote(req.user.id, 1);

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

  let vowel = "vowel_"+post.vowel;
  let consonant = "consonant_"+post.consonant;

  // test for initial / medial / final and record to given User History model
  let result = await UserHistoryInitial.update({user: post.author.id},{ $inc: {[vowel]: 1, [consonant]: 1} }, {upsert: true});

  res.json(post);
};

exports.downvote = async (req, res) => {
  const post = await req.post.vote(req.user.id, -1);

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

  let vowel = "vowel_"+post.vowel;
  let consonant = "consonant_"+post.consonant;

  // test for initial / medial / final and record to given User History model
  let result = await UserHistoryInitial.update({user: post.author.id},{ $inc: {[vowel]: -1, [consonant]: -1} }, {upsert: true});

  res.json(post);
};

exports.unvote = async (req, res) => {
  const post = await req.post.vote(req.user.id, 0);

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

  let vowel = "vowel_"+post.vowel;
  let consonant = "consonant_"+post.consonant;

  // test for initial / medial / final and record to given User History model
  let result = await UserHistoryInitial.update({user: post.author.id},{ $inc: {[vowel]: -1, [consonant]: -1} }, {upsert: true});

  res.json(post);
};

exports.destroy = async (req, res) => {
  await req.post.remove();
  res.json({ message: 'success' });
};
