/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

const config = require('./config');
const jwt = require('jsonwebtoken');
const db = require('./db');
const helper = require('./helper');

const sign = (payload)=>{
    return jwt.sign(payload, config.secret, {
                expiresIn: 1440
            });
};

const decode = (req)=>{
    var user = jwt.verify(req.body.token,config.secret);
    return user;
};

const asUser = (req,res,consume) => {
    var userData = decode(req);
    db.User.findOne({_id:userData.name},(err,user)=>{
        if(err) {
            res.send({message:helper.message("User action error",false)});
        }
        consume(user);
    });
};

const asAdmin = (req,res,consume) => {
    asUser(req,res,(user)=>{
        if(!user.admin){
            res.send({message:helper.message("Insufficient premissions",false)});
        } else {
            consume(user);
        }
    });
};

module.exports = {
    decode: decode,
    sign: sign,
    asUser: asUser,
    asAdmin: asAdmin
};