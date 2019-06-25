const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const interactionSchema = new Schema({

    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    setting: { type: Number, required: true },
    audience: { type: Number, required: true },
    intention: { type: Number, required: true },
    ease: { type: Number, required: true },

});

interactionSchema.set('timestamps', true);

interactionSchema.set('toJSON', { getters: true, virtuals: true });

interactionSchema.options.toJSON.transform = (doc, ret) => {
  const obj = { ...ret };
  delete obj._id;
  delete obj.__v;
  return obj;
};

const Interaction = mongoose.model('Interaction', interactionSchema);

module.exports = Interaction;
