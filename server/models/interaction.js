const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const interactionSchema = new Schema({

    userid: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    setting: { type: Number, required: true },
    audience: { type: Number, required: true },
    intention: { type: Number, required: true },
    Ease: { type: Number, required: true },

})

interactionSchema.set('timestamps', true);

const Interaction = mongoose.model('Interaction', interactionSchema);

module.exports = Interaction;

