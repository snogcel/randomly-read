const { body, validationResult } = require('express-validator/check');
const Interaction = require('../models/interaction');

exports.create = async (req, res, next) => {

  const result = validationResult(req);
  if (!result.isEmpty()) {
    const errors = result.array({ onlyFirstError: true });
    return res.status(422).json({ errors });
  }

  try {
    const { setting, audience, intention, ease } = req.body;
    const author = req.user.id;
    const interaction = await Interaction.create({
      author,
      setting,
      audience,
      intention,
      ease,
    });
    res.status(201).json(interaction);
  } catch (err) {
    next(err);
  }

  };

exports.list = async (req, res) => {
  const interactions = await Interaction.find();

  console.log(interactions);

  res.json(interactions);
};
