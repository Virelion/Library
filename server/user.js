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
};

module.exports = {
    init: init
};