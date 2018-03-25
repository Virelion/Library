var express = require('express');
var app = express();

app.get('/search/smt', (req,res)=>{
   res.send([
       {
           author: "Guy",
           title: "asdf",
           avaliable: 2
       }
   ]);
});

var server = app.listen(9000,()=>{
    
});