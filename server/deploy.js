const bcrypt = require('bcryptjs');
const db = require('./db');

function setup(user,password,callback){
    var admin = new db.User({
        name: user,
        hash: bcrypt.hashSync(password, 10),
        admin: true
    });
    
    db.User.remove({},(err)=>{
        if(err){
            console.log(err);
            callback();
            return;
        } else {
            console.log("Users cleared");
            admin.save((err)=>{
                if(err){
                    console.log(err);
                } else {
                    console.log("Admin initiated");
                }
                callback();
                return;
            });
        }
    });
}

setup("admin","admin",()=>{
    process.exit(0);
});