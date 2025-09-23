const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const voteHistorySchema = new mongoose.Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  cmudict_id:{ type: Number, required: true },
  created: { type: Date, default: Date.now },
  score: { type: Number, required: true },
  consonant: { type: String },
  vowel: { type: String },
  syllables: { type: String }
}, { collation: { locale: 'en', strength: 1 } });

voteHistorySchema.set('toJSON', { getters: true });

voteHistorySchema.options.toJSON.transform = (doc, ret) => {
  const obj = { ...ret };
  delete obj._id;
  delete obj.__v;
  return obj;
};

const VoteHistory = mongoose.model('voteHistory', voteHistorySchema);

module.exports = VoteHistory;
