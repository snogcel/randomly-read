const mongoose = require('mongoose');

// TODO - add user ref

const interactionSettingsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  audience: { type: Array, "default": [], required: true }
}, { collation: { locale: 'en', strength: 1 } });

interactionSettingsSchema.set('toJSON', { getters: true });

interactionSettingsSchema.options.toJSON.transform = (doc, ret) => {
  const obj = { ...ret };
  delete obj._id;
  delete obj.__v;
  return obj;
};

const interactionSettings = mongoose.model('interactionSettings', interactionSettingsSchema);

module.exports = interactionSettings;
