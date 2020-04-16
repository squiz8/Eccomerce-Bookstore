var express = require('express');
var router = express.Router();

var bookModel = require('../models/bookModel')
var categoryModel = require('../models/categoryModel');

/* GET home page. */
router.get('/', function(req, res, next) {
    //Get cart details from session
    var cart = req.session.cart;
    var displayCart = {items:[], total:0};
    var total = 0;

    //Get total
    for(item in cart){
        displayCart.items.push(cart[item]);
        total +=(cart[item].qty * cart[item].price);
    }
    displayCart.total = total;

    //Render Cart
    res.render('cart/index', {
        cart: displayCart
    });
    console.log(cart);
});

router.post('/:id', function(req, res, next){
    req.session.cart = req.session.cart || {};
    var cart = req.session.cart;

    bookModel.findOne({_id: req.params.id}, function(err, book){
        if(err){
            console.log(err);
        }
        if(cart[req.params.id]){
            cart[req.params.id].qty++;
        }else{
            cart[req.params.id] = {
                item: book._id,
                title: book.title,
                price: book.price,
                qty: 1
            }
        }
        res.redirect('/cart');
    });
});

router.delete('/cart/remove', function(req, res, next){
    var cart = req.session.cart;
    cart.remove
})

module.exports = router;