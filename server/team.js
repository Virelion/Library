const userSession = require('./userSession');
const helper = require('./helper');
const db = require('./db');

var init = function init(app){
    //Team
    app.post('/api/team/create',(req,res)=>{
        userSession.asAdmin(req,res,(admin)=>{
            var team = new db.Team({_id: db.newID(), name: req.body.data.name});
            team.save((err)=>{
                if(err){
                    res.send({message:helper.message("Error while creating team",false)});
                } else {
                    res.send({message:helper.message("Team created",true)});
                }
            });
        });
    });
    
    app.post('/api/team/delete',(req,res)=>{
        userSession.asAdmin(req,res,(admin)=>{
            var data = req.body.data;
            db.Team.findById(data._id).remove( (err)=>{
                if(err){
                    res.send({message:helper.message("Failed to delete team",false)});
                } else {
                    res.send({message:helper.message("Removed team",true)});
                }
            });
        });
    });

    app.post('/api/team/list',(req,res)=>{
        userSession.asAdmin(req,res,(admin)=>{
            db.Team.find({},(err,teams)=>{
                if(err) res.send({message:helper.message("Failed to list teams",false)});
                res.send({
                    message:helper.message("Team list",true),
                    teams: teams
                });
            });
        });
    });
    
    app.post('/api/team/edit',(req,res)=>{
        userSession.asAdmin(req,res,(admin)=>{
            db.Team.findById(req.body.data._id,(err,team)=>{
                if(team){
                    team.name = req.body.data.name;
                    team.save((err)=>{
                        if(err){
                            res.send({message:helper.message("Failed to change team",false)});
                        } else {
                            res.send({message:helper.message("Team changed",true)});
                        }
                    });
                } else {
                    res.send({message:helper.message("Team not found",false)});
                }
            });
        });
    });
};

module.exports = {
    init: init
};