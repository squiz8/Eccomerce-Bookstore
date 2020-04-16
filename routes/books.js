var express = require('express');
var router = express.Router();

var bookModel = require('../models/bookModel')
var categoryModel = require('../models/categoryModel');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/details/:id', function(req, res, next){
  bookModel.findOne({_id: req.params.id}, (err, book)=>{
    if(err){
      console.log('Error: ' + err);
    }
    res.render('books/details',{
      "book": book
    });
  });
  
});
module.exports = router;