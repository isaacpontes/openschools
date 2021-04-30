const mongoose = require('mongoose');

const sectorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now }
});

const Sector = mongoose.model('Sector', sectorSchema);

module.exports = Sector;
