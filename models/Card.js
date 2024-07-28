const mongoose = require('mongoose');
const Transaction = require('./Transaction');

const cardSchema = mongoose.Schema({
  name: { type: String, required: true },
  number: { type: Number, required: false },
  date: { type: String, required: true },
  cvv: { type: Number, required: true },
  bank: { type: String, required: false },
  iban: { type: String, required: false },
  funds: { type: Number, default: 10000, required: false },
  transactions: { type: [Transaction.schema], default: [] }
});

module.exports = mongoose.model('Card', cardSchema);
