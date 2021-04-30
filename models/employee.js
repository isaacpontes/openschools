const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  enrollment: { type: String, required: true },
  position: { type: String, required: true },
  role: { type: String, required: true },
  bond: {
    type: String,
    enum: ['Efetivo', 'DAS', 'RPA', 'Contrato'],
    required: true
  },
  birthday: { type: String, required: true },
  cpf: { type: String, required: true },
  rg: { type: String, required: true },
  ctps: { type: String, required: true },
  electorTitle: { type: String, required: true },
  pis: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  situation: {
    type: String,
    required: true
  },
  admissionDate: { type: Date, required: true },
  formation: { type: String, required: true },
  complementaryFormation: { type: String },
  workload: { type: String, required: true },
  fundeb: { type: String, required: true },
  originSector: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sector',
    required: true
  },
  currentSector: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sector'
  },
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School'
  },
  classroom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Classroom'
  },
  shift: {
    type: String,
    enum: ['Manhã', 'Tarde', 'Noite']
  },
  info: { type: String },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now }
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
