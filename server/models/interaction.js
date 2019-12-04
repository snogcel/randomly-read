const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const interactionSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    postId: { type: Schema.Types.ObjectId, ref: 'Post', required: false },
    word: { type: String, required: true },
    ease: { type: Number, required: true },
    consonant: { type: String, required: false },
    vowel: { type: String, required: false }
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

