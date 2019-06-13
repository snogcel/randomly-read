const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const interactionSchema = new Schema({

    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    setting: { type: Number, required: true },
    audience: { type: Number, required: true },
    intention: { type: Number, required: true },
    ease: { type: Number, required: true },

})

interactionSchema.set('timestamps', true);

const Interaction = mongoose.model('Interaction', interactionSchema);

module.exports = Interaction;

