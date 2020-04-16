var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/bookstore', function(err){
    if(err){
        console.log('not connected ' + err);
    }else{
        console.log('database connected');
    }
});
