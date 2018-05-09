const userSession = require('./userSession');
const helper = require('./helper');
const db = require('./db');

var init = function init(app){
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
};

module.exports = {
    init: init
};