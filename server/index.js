var express = require('express');
var app = express();
var session = require('express-session');
var config = require('./config');
var helper = require('./helper');
var db = require('./db');
var jwt = require('jsonwebtoken');


app.set('superSecret',config.secret);

// Add headers
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', config.app);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

function restrict(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    req.session.error = 'Access denied!';
    res.send(helper.message("DENIED",false));
  }
}

app.get('/api/search/books/', (req,res)=>{
   res.send([
       {
           author: "Guy",
           title: "All",
           avaliable: 2
       }
   ]);
});
app.get('/api/search/books/:phrase', (req,res)=>{
   res.send([
       {
           author: "Guy",
           title: req.params.phrase,
           avaliable: 2
       }
   ]);
});

app.post('/api/sign-in',(req,res)=>{
    db.User.find({name: req.body.name},(err,user)=>{
        if(err) {
            res.json({success: false});
            return;
        }
        if(user && user.hash === req.body.hash){
            const payload = {
                user: user.name,
                admin: user.admin
            };

            var token = jwt.sign(payload, app.get('superSecret'), {
                expiresIn: 1440
            });

            res.json({
                success: true,
                token: token
            });
        }
    });
});

app.post('/api/sign-out',(req,res)=>{
   req.session.user = null;
   res.send(helper.message("SIGN_OUT",true));
});


app.listen(9000);