var mongoose = require('mongoose');

var expenseSchema = mongoose.Schema({
    title: String,
    amount: Number,
    type: String,
    date: Number
   });

var expenseModel = mongoose.model('expenses', expenseSchema);

module.exports = expenseModel;
      