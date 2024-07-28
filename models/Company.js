const mongoose = require('mongoose');

const companySchema = mongoose.Schema({
  name: { type: String, required: true },
  percentage: { type: Number, required: true },
  lossorwin: { type: Number, required: true },
});

module.exports = mongoose.model('Company', companySchema);
