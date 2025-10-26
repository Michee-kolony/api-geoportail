const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const adminSchema = new mongoose.Schema({
  pseudo: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now }
});


// Application du plugin sur le schéma
adminSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Admin', adminSchema);
