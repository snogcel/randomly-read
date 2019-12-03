const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const viewHistorySchema = new mongoose.Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  title: { type: String, required: true },
  cmudict_id:{ type: Number },
  created: { type: Date, default: Date.now },
  consonant: { type: String },
  vowel: { type: String },
  syllables: { type: String }
}, { collation: { locale: 'en', strength: 1 } });

viewHistorySchema.set('toJSON', { getters: true });

viewHistorySchema.options.toJSON.transform = (doc, ret) => {
  const obj = { ...ret };
  delete obj._id;
  delete obj.__v;
  return obj;
};

const ViewHistory = mongoose.model('viewHistory', viewHistorySchema);

module.exports = ViewHistory;
