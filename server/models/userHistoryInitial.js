const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userHistoryInitialSchema = new mongoose.Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  vowel_AA: { type: Number, default: 0 },
  vowel_AE: { type: Number, default: 0 },
  vowel_AH: { type: Number, default: 0 },
  vowel_AO: { type: Number, default: 0 },
  vowel_AW: { type: Number, default: 0 },
  vowel_AY: { type: Number, default: 0 },
  vowel_EH: { type: Number, default: 0 },
  vowel_ER: { type: Number, default: 0 },
  vowel_EY: { type: Number, default: 0 },
  vowel_IH: { type: Number, default: 0 },
  vowel_IY: { type: Number, default: 0 },
  vowel_OW: { type: Number, default: 0 },
  vowel_OY: { type: Number, default: 0 },
  vowel_UW: { type: Number, default: 0 },
  consonant_AA: { type: Number, default: 0 },
  consonant_AE: { type: Number, default: 0 },
  consonant_AH: { type: Number, default: 0 },
  consonant_AO: { type: Number, default: 0 },
  consonant_AW: { type: Number, default: 0 },
  consonant_AY: { type: Number, default: 0 },
  consonant_EH: { type: Number, default: 0 },
  consonant_ER: { type: Number, default: 0 },
  consonant_EY: { type: Number, default: 0 },
  consonant_IH: { type: Number, default: 0 },
  consonant_IY: { type: Number, default: 0 },
  consonant_OW: { type: Number, default: 0 },
  consonant_OY: { type: Number, default: 0 },
  consonant_UW: { type: Number, default: 0 },
  consonant_B: { type: Number, default: 0 },
  consonant_CH: { type: Number, default: 0 },
  consonant_D: { type: Number, default: 0 },
  consonant_F: { type: Number, default: 0 },
  consonant_G: { type: Number, default: 0 },
  consonant_HH: { type: Number, default: 0 },
  consonant_JH: { type: Number, default: 0 },
  consonant_K: { type: Number, default: 0 },
  consonant_L: { type: Number, default: 0 },
  consonant_M: { type: Number, default: 0 },
  consonant_N: { type: Number, default: 0 },
  consonant_P: { type: Number, default: 0 },
  consonant_R: { type: Number, default: 0 },
  consonant_S: { type: Number, default: 0 },
  consonant_SH: { type: Number, default: 0 },
  consonant_T: { type: Number, default: 0 },
  consonant_TH: { type: Number, default: 0 },
  consonant_V: { type: Number, default: 0 },
  consonant_W: { type: Number, default: 0 },
  consonant_Y: { type: Number, default: 0 },
  consonant_Z: { type: Number, default: 0 },
}, { collation: { locale: 'en', strength: 1 } });

userHistoryInitialSchema.set('toJSON', { getters: true });

userHistoryInitialSchema.options.toJSON.transform = (doc, ret) => {
  const obj = { ...ret };
  delete obj._id;
  delete obj.__v;
  return obj;
};

const UserHistoryInitial = mongoose.model('userHistoryInitial', userHistoryInitialSchema);

module.exports = UserHistoryInitial;
