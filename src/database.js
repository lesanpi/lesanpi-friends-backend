const mongoose = require('mongoose');
const { mongodb } = require('./keys');

mongoose.connect(mongodb.URI, { dbName: "friends" })
    .then(db => console.log('Database connected'))
    .catch(err => console.error(err));