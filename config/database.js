const mongoose = require('mongoose');
const seedAdmin = require('./seed');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/openschools', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
  .then((mongo) => {
    console.log('Successfully connected to MongoDB.');
    seedAdmin(mongo.connection.collections.users);
  })
  .catch((err) => console.log(err));
