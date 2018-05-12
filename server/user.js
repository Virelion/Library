const userSession = require('./userSession');
const db = require('./db');
const helper = require('./helper');
const bcrypt = require("bcryptjs");

var init = function init(app){
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
    
    app.post('/api/user/edit',(req,res)=>{
        userSession.asAdmin(req,res,(admin)=>{
            db.User.findById(req.body.data._id,(err,user)=>{
                user.admin = req.body.data.admin;
                if(req.body.data.team==="0"){
                    user.team = undefined;
                } else {
                    user.team = req.body.data.team;
                }
                user.save((err)=>{
                    if(err){
                        res.send({message:helper.message(err,false)});
                    } else {
                        res.send({message:helper.message("User changed",true)});
                    }
                });
            });
        });
    });
};

module.exports = {
    init: init
};