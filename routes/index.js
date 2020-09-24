var express = require('express');
var router = express.Router();
var expenseModel = require('../models/expenses')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/expenses-history', async function(req, res, next) {

  var expenses = await expenseModel.find()

  res.json({expenses})
});

router.post('/add-expense', async function(req, res, next) {

  var newExpense = new expenseModel({
    title: req.body.title,
    type: req.body.type,
    amount: req.body.amount,
    date: Date.now(),
  })

  var expenseSave = await newExpense.save()

  var result = false
  if(expenseSave.title){
    result = true
  }

  res.json({result})
});

router.delete('/delete-expense/:date', async function(req, res, next) {

  await expenseModel.deleteOne({ date: req.params.date})
  var expenses = await expenseModel.find()

  res.json({expenses})
});



module.exports = router;
