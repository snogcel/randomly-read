const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: false },
  routines: { type: Array, required: false },
  interactionSettings: { type: Array, required: false },
  age: { type: Number, required: false },
  gender: { type: String, required: false },
  address: { type: String, required: false },
  city: { type: String, required: false },
  stateProvince: { type: String, required: false },
  postalCode: { type: String, required: false },
  country: { type: String, required: false },
  admin: { type: Boolean, required: false },
  superuser: { type: Boolean, required: false },
  company: { type: String, required: false },
  clients: { type: Array, required: false },
  isActive: { type: Boolean, required: false }
}, { collation: { locale: 'en', strength: 1 } });

userSchema.set('toJSON', { getters: true });
userSchema.options.toJSON.transform = (doc, ret) => {
  const obj = { ...ret };
  delete obj._id;
  delete obj.__v;
  delete obj.password;

  return obj;
};

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
