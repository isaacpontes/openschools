const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  enrollment: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  gender: { 
    type: String,
    enum: ['male', 'female'],
    required: true
  },
  phone: { 
    type: String, 
    required: true 
  },
  address: { 
    type: String, 
    required: true 
  },
  birthday: { 
    type: Date,
    required: true
  },
  birthPlace: { 
    type: String, 
    required: true 
  },
  fatherName: { 
    type: String,
    required: true
  },
  fatherOcupation: {
    type: String, 
    required: true
  },
  motherName: {
    type: String,
    required: true
  },
  motherOcupation: {
    type: String,
    required: true
  },
  bloodType: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    required: true
  },
  info: { type: String },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',
    required: true,
  },
  classroom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Classroom',
    required: true,
  },
  transport: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Transport'
  }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
