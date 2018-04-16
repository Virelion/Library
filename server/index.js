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


//Account 
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
    userSession.asUser(req,res,(user)=>{
        var newPass = req.body.password;
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


//User
app.post('/api/user/create',(req,res)=>{
    userSession.asAdmin(req,res,(admin)=>{
        var user = new db.User({
            name: req.body.name,
            hash: bcrypt.hashSync(req.body.password),
            admin: req.body.admin,
            team: req.body.team
        });
        user.save((err)=>{
            if(err){
                res.send({message:helper.message("Error while creating",false)});
            } else {
                res.send({message:helper.message("Created",true)});
            }
        });
    });
});

app.post('/api/user/list',(req,res)=>{
    userSession.asAdmin(req,res,(admin)=>{
        db.User.find({},'name team admin',(err,users)=>{
            if(err) res.send({message:helper.message("Error",false)});
            res.send({
                message:helper.message("List",true),
                users: users
            });
        });
    });
});

//Team
app.post('/api/team/create',(req,res)=>{
    userSession.asAdmin(req,res,(admin)=>{
        var team = new db.Team({name: req.body.name});
        team.save((err)=>{
            if(err){
                res.send({message:helper.message("Error while creating team",false)});
            } else {
                res.send({message:helper.message("Team created",true)});
            }
        });
    });
});

app.post('/api/team/list',(req,res)=>{
    userSession.asAdmin(req,res,(admin)=>{
        db.Team.find({},(err,teams)=>{
            if(err) res.send({message:helper.message("Error",false)});
            res.send({
                message:helper.message("Team list",true),
                teams: teams
            });
        });
    });
});



app.listen(9000);