const userSession = require('./userSession');
const helper = require('./helper');
const db = require('./db');

var init = function init(app){
    //Retrospectives
    app.post('/api/issue/create',(req,res)=>{
        userSession.asUser(req,res,(user)=>{
            var data = req.body.data;
            var issue = new db.Issue({_id: db.newID(), name: data.name, description: data.description, type: data.type, retrospective: data.retrospective, upVote: []});
            issue.save((err)=>{
                if(err){
                    res.send({message:helper.message("Error while creating issue",false)});
                } else {
                    res.send({message:helper.message("Issue created",true)});
                }
            });
        });
    });
    
    app.post('/api/issue/list',(req,res)=>{
        var data = req.body;
        userSession.asUser(req,res,(user)=>{
            db.Issue.find({retrospective: data.retrospective}).exec((err,issues)=>{
                if(err) res.send({message:helper.message("Failed to list issues",false)});
                res.send({
                    message: helper.message("Issue list",true),
                    issues: issues,
                    issueTypes: db.IssueTypes
                });
            });
        });
    });
    
    app.post('/api/issue/delete',(req,res)=>{
        userSession.asUser(req,res,(admin)=>{
            var data = req.body.data;
            db.Issue.findById(data._id).remove( (err)=>{
                if(err){
                    res.send({message:helper.message("Failed to delete issue",false)});
                } else {
                    res.send({message:helper.message("Removed issue",true)});
                }
            });
        });
    });
    
    app.post('/api/issue/edit',(req,res)=>{
        userSession.asUser(req,res,(user)=>{
            let data = req.body.data;
            db.Issue.findById(data._id,(err,issue)=>{
                if(issue){
                    issue.name = data.name;
                    issue.description = data.description;
                    issue.type = data.type;
                    issue.save((err)=>{
                        if(err){
                            res.send({message:helper.message("Failed to change issue",false)});
                        } else {
                            res.send({message:helper.message("Issue changed",true)});
                        }
                    });
                } else {
                    res.send({message:helper.message("Issue not found",false)});
                }
            });
        });
    });
    
    app.post('/api/issue/upvote',(req,res)=>{
        userSession.asUser(req,res,(user)=>{
            let data = req.body.data;
            db.Issue.findById(data._id,(err,issue)=>{
                if(issue){
                    if(!issue.upVote.includes(user._id)){
                        issue.upVote.push(user._id);
                    };
                    issue.save((err)=>{
                        if(err){
                            res.send({message:helper.message("Failed to upvote issue",false)});
                        } else {
                            res.send({message:helper.message("Issue upvoted",true)});
                        }
                    });
                } else {
                    res.send({message:helper.message("Issue not found",false)});
                }
            });
        });
    });
    
    app.post('/api/issue/withdraw',(req,res)=>{
        userSession.asUser(req,res,(user)=>{
            let data = req.body.data;
            db.Issue.findById(data._id,(err,issue)=>{
                if(issue){
                    var i = issue.upVote.indexOf(user._id);
                    if(i !== -1) {
                        issue.upVote.splice(i, 1);
                    }
                    issue.save((err)=>{
                        if(err){
                            res.send({message:helper.message("Failed to upvote issue",false)});
                        } else {
                            res.send({message:helper.message("Issue upvoted",true)});
                        }
                    });
                } else {
                    res.send({message:helper.message("Issue not found",false)});
                }
            });
        });
    });
};

module.exports = {
    init: init
};