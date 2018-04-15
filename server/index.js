const express = require('express');
const app = express();
const session = require('express-session');
const config = require('./config');
const helper = require('./helper');
const db = require('./db');
const jwt = require('jsonwebtoken');
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

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
    db.User.findOne({_id: req.body.name},(err,user)=>{
        if(err) {
            res.send({success: false, message: "Error while retrieving user"});
        }
        else if(user && bcrypt.compareSync(req.body.password,user.hash)){
            const payload = {
                name: user.name,
                admin: user.admin
            };

            var token = jwt.sign(payload, app.get('superSecret'), {
                expiresIn: 1440
            });

            res.send({
                success: true,
                token: token,
                user: payload
            });
        }
        else {
            res.send({success: false, message: "Wrong user or password"});
        }
    });
});

app.post('/api/changePassword',(req,res)=>{
   console.log(req.body);
   //jwt.verify
});

app.post('/api/sign-out',(req,res)=>{
   
});

app.listen(9000);