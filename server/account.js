const userSession = require('./userSession');
const db = require('./db');
const helper = require('./helper');
const bcrypt = require("bcryptjs");

var init = function init(app){
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
            if(bcrypt.compareSync(req.body.oldPassword,user.hash)){
                user.set({hash:bcrypt.hashSync(newPass, 10)});
                user.save((err)=>{
                    if(err) {
                        res.send({message:helper.message("Cannot change password",false)});
                    } else {
                        res.send({message:helper.message("Password changed",true)});
                    }
                });
            } else {
                res.send({message:helper.message("Bad old password",false)});
            }
        });
    });
};

module.exports = {
    init: init
};