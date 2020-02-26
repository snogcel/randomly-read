const mongoose = require('mongoose');

// TODO - add user ref

const routineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  age: { type: String, required: false },
  subroutine: { type: Array, "default": [], required: true }
}, { collation: { locale: 'en', strength: 1 } });

routineSchema.set('toJSON', { getters: true });

routineSchema.options.toJSON.transform = (doc, ret) => {
  const obj = { ...ret };
  delete obj._id;
  delete obj.__v;
  return obj;
};

const Routine = mongoose.model('routine', routineSchema);

module.exports = Routine;
