const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const interactionSchema = new Schema({

    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    setting: { type: String, required: true },
    audience: { type: String, required: true },
    intention: { type: Boolean, required: true },
    applied: { type: Boolean, required: true },
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

