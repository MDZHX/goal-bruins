const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const goalSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
}, { timestamps: true });

const Goal = mongoose.model('goal', goalSchema);
module.exports = Goal;