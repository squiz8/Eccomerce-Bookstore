var express = require('express');
var router = express.Router();

var bookModel = require('../models/bookModel')
var categoryModel = require('../models/categoryModel');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin/index');
});

router.get('/books', function(req, res, next) {
  bookModel.find({}, function(err, books){
    if(err){
      console.log('An error occured ' + err);
    }
    res.render('admin/books/index', {
      'books': books
    });
  });
  });
  router.get('/categories', function(req, res, next) {
    categoryModel.find({}, function(err, categories){
      if(err){
        console.log('Error has Occurred' + err);
      }
    res.render('admin/categories/index', {
      "categories": categories
    });
    });
  });

  router.get('/books/add', function(req, res, next){
    categoryModel.find({}, function(err, categories){
      if(err){
        console.log('Error has Occurred' + err);
      } else{
        res.render('admin/books/add', {
          "categories": categories
        });
      }
    
    });
  });

  router.post('/books/add', function(req, res, next){ 
    console.log(req.body);
    var title           = req.body.title;
    var author          = req.body.author;
    var publisher       = req.body.publisher;
    var price           = req.body.price;
    var category        = req.body.category;
    var description     = req.body.description;
    var coverImageUrl   = req.body.coverimageurl;
    console.log(req.body);
    
/*
    req.checkBody('title', 'Error: Title field is required').notEmpty();
    req.checkBody('author', 'Error: author field is required').notEmpty();
    req.checkBody('publisher', 'Error: Publisher field is required').notEmpty();
    req.checkBody('price', 'Error: Title price is required').notEmpty();
    req.checkBody('description', 'Error: description field is required').notEmpty();
    req.checkBody('coverimageurl', 'Error: coverimage field is required').notEmpty();

    var errors = req.validationErrors();
    if(errors){
      res.render('admin/books/add', {
        "errors": errors
      });
    } 
    */
   if(title =='' || price == ''){
     req.flash('error', 'Please fill out required fields');
     //res.location('/admin/books/add');
     res.redirect('/admin/books/add');
   }
  /* if(isNaN(price)){
     req.flash('error', 'Price is not a number');
     //res.location('/admin/books/add');
     res.redirect('/admin/books/add');
   }
   */
   
   
    var newBook = new bookModel({
      title: title,
      author: author,
      publisher: publisher,
      price: price,
      category: category,
      description: description,
      coverimage: coverImageUrl
    });
    console.log(newBook);

    newBook.save((err)=>{
      if(err){
        console.log('Error occured during save' + err);
      }
      req.flash('success', 'Book Has Been Added');
     // res.location('admin/books');
      res.redirect('/admin/books');
    });
  });
/*
  router.get('/books/edit/:id', function(req, res, next){
    categoryModel.find({}, function(err, categories){
      bookModel.findOne({_id:req.params.id}, function(err, book){
        if(err){
          console.log('Edit error occured' + err);
        }else{
          req.flash('success', 'You are about to edit a book ' + req.params.id);
          res.render('/admin/books/edit', {
            "book": book,
            "categories": categories
          });
        }
      });
    });
  });
  */
   // Display Book Edit Form
   router.get('/books/edit/:id', function(req, res){
    categoryModel.find({}, function(err, categories){
        bookModel.findOne({_id:req.params.id}, function(err, book){
            if(err){
                console.log(err);
            }

            var model = {
                book: book,
                categories: categories
            };

            res.render('admin/books/edit', model);
        });
    });
});

router.post('/books/edit/:id', function(req, res, next){
  var title           = req.body.title;
  var author          = req.body.author;
  var publisher       = req.body.publisher;
  var price           = req.body.price;
  var category        = req.body.category;
  var description     = req.body.description;
  var coverImageUrl   = req.body.coverimageurl;

  bookModel.update({_id: req.params.id}, {
    title: title,
      author: author,
      publisher: publisher,
      price: price,
      category: category,
      description: description,
      coverimage: coverImageUrl
  }, function(err){
    if(err){
      console.log(err);
    }
    req.flash('success', 'Book Updated');
    res.redirect('/admin/books');
  })
});

//Delete Book
router.delete('/books/delete/:id', function(req, res, next){
  bookModel.remove({_id: req.params.id}, function(err){
    if(err){
      console.log(err);
    }
    req.flash('success', "Book has been deleted");
    res.render('/admin/books');
  });
});

router.get('/categories/add', function(req, res, next){
  res.render('admin/categories/add');
});

router.post('/categories/add', function(req, res, next){
  var name = req.body.name;

  if(name == ''){
    req.flash('error', 'Name field is required');
    res.redirect('admin/categories/add');
  }

  var newCategory = new categoryModel({
    name: name
  });

  newCategory.save(function(err){
    if(err){
      console.log(err);
    }
    req.flash('success', 'Category Added');
    res.redirect('/admin/categories');
  })
});

//Edit category
router.get('/categories/edit/:id', function(req, res, next){
  categoryModel.findOne({_id: req.params.id}, function(err, category){
    if(err){
      console.log(err);
    }
    var model = {
      category: category
    }
    res.render('admin/categories/edit', model);
  })
});

//Post category
router.post('/categories/edit/:id', function(req, res, next){
  var name = req.body.name;

  categoryModel.update({_id: req.params.id}, {
    name: name
  }, function(err){
    if(err){
      console.log(err);
    }
    req.flash('success', 'Category Edited');
    res.redirect('/admin/categories');
  });
});

//Delete Category 
router.delete('categories/delete/:id', function(req, res, next){
  categoryModel.remove({_id: req.params.id}, function(err){
    if(err){
      console.log(err);
    }
    req.flash('success', 'Category Has Been Deleted');
    res.redirect('/admin/categories');
  });
});


module.exports = router;