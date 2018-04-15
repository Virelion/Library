const express = require('express');
const app = express();
const session = require('express-session');
const config = require('./config');
const helper = require('./helper');
const db = require('./db');
const userSession = require('./userSession');
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
            res.send({message:helper.message("Error while retrieving user",false)});
        }
        else if(user && bcrypt.compareSync(req.body.password,user.hash)){
            const payload = {
                name: user.name,
                admin: user.admin
            };

            var token = userSession.sign(payload);

            res.send({
                message: helper.message("Logged in",true),
                token: token,
                user: payload
            });
        }
        else {
            res.send({message:helper.message("Wrong user or password",false)});
        }
    });
});

app.post('/api/changePassword',(req,res)=>{
    var userData = userSession.decode(req);
    var newPass = req.body.password;
    db.User.findOne({_id:userData.name},(err,user)=>{
        user.set({hash:bcrypt.hashSync(newPass, 10)});
        user.save((err)=>{
            if(err) {
                res.send({message:helper.message("Cannot change password",false)});
            } else {
                res.send({message:helper.message("Password changed",true)});
            }
        });
    });
});

app.listen(9000);