const userSession = require('./userSession');
const helper = require('./helper');
const db = require('./db');

var init = function init(app){
    //Retrospectives
    app.post('/api/retrospective/create',(req,res)=>{
        userSession.asUser(req,res,(user)=>{
            var data = req.body.data;
            var retro = new db.Retrospective({_id: db.newID(), name: data.name, date: data.date, team: user.team});
            retro.save((err)=>{
                if(err){
                    res.send({message:helper.message("Error while creating retrospective",false)});
                } else {
                    res.send({message:helper.message("Retrospective created",true)});
                }
            });
        });
    });
    
    app.post('/api/retrospective/list',(req,res)=>{
        userSession.asUser(req,res,(user)=>{
            db.Retrospective.find({team: user.team},(err,retrospectives)=>{
                if(err) res.send({message:helper.message("Failed to list retrospectives",false)});
                res.send({
                    message:helper.message("Retrospective list",true),
                    retrospectives: retrospectives
                });
            });
        });
    });
    
    app.post('/api/retrospective/delete',(req,res)=>{
        userSession.asUser(req,res,(admin)=>{
            var data = req.body.data;
            db.Retrospective.findById(data._id).remove( (err)=>{
                if(err){
                    res.send({message:helper.message("Failed to delete retrospective",false)});
                } else {
                    res.send({message:helper.message("Removed retrospective",true)});
                }
            });
        });
    });

    
    app.post('/api/retrospective/edit',(req,res)=>{
        userSession.asUser(req,res,(user)=>{
            let data = req.body.data;
            db.Retrospective.findById(data._id,(err,retrospective)=>{
                
            });
        });
    });
};

module.exports = {
    init: init
};