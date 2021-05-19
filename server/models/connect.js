const mongoose = require('mongoose');

const dbURI = "mongodb+srv://Qi:jZjavgSFKU52brkJ@cluster0.vo0vb.mongodb.net/example?retryWrites=true&w=majority";

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => console.log('Connected to db'))
    .catch((err) => console.log(err));

module.exports = mongoose;