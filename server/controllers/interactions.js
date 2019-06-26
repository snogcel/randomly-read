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
    const interactions =  await Interaction.find();
    res.json(interactions);
  };

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
