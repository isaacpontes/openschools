const mongoose = require('mongoose');

const transportSchema = new mongoose.Schema({
  name: { type: String, required: true },
  driver: { type: String, required: true },
  info: { type: String },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now }
});

const Transport = mongoose.model('Transport', transportSchema);

module.exports = Transport;
