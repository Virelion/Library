/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

const config = require('./config');
const jwt = require('jsonwebtoken');
const db = require('./db');

const sign = (payload)=>{
    return jwt.sign(payload, config.secret, {
                expiresIn: 1440
            });
};

const decode = (req)=>{
    var user = jwt.verify(req.body.token,config.secret);
    return user;
};

module.exports = {
    decode: decode,
    sign: sign
};