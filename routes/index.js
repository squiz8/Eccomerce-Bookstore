var express = require('express');
var router = express.Router();
var db = require('../lib/db');
var bookModel = require('../models/bookModel');

/* GET home page. 
router.get('/', function(req, res, next) {
bookModel.find({}, (err, books)=>{
  if(err){
    cconsole.log('Error: ' + err);
  }
  var model = {
    books: books
  }
  res.render('index', model);
});  
});
*/
router.get('/', function(req, res, next){

  /*var books = db.collection('books');
  console.log(db);
*/
  bookModel.find({}, function(err, books){
    console.log(books);
    if(err) throw err;
    //To enable the trucate work in the view 
    books.forEach(function(book){
      book.truncText = book.truncText(60);
    })
    res.render('index', {
      "books": books
    })
  });
});

module.exports = router;
