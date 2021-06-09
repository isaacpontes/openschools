const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

const Grade = mongoose.model('Grade', gradeSchema);

module.exports = Grade;
