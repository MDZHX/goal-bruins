const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,

    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },

    goals_created:[{
        type: Schema.Types.ObjectId, 
        ref:'goal',
        required: true
    }],

    goals_followed:[{
        type: Schema.Types.ObjectId, 
        ref:'goal',
        required: true
    }],

    goals_liked:[{
        type: Schema.Types.ObjectId, 
        ref:'goal',
        required: true
    }]

}, { timestamps: true });

const User = mongoose.model('user', userSchema);
module.exports = User;