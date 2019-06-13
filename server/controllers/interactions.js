const Interaction = require('../models/interaction');

exports.create = async (req, res, next) => {
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
    const interactions =  Interaction.find();
    res.json(interactions);
  };
  