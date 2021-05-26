const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const goalSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },

    authorId: {
        type: Schema.Types.ObjectId, 
        ref:'user',
        required: true
    },

    likes: {
        type: Number, 
        default: 0,
    },

    follows: {
        type: Number, 
        default: 0,
    }

}, { timestamps: true });

const Goal = mongoose.model('goal', goalSchema);
module.exports = Goal;