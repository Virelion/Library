import Session from './Session';
const config = require('./config');
var Helper = {};

Helper.websiteName = "ScrumBox";
Helper.title = Helper.title || {};

Helper.title.set = (title) => {
    document.title = title + " | " + Helper.websiteName;
};

Helper.title.reset = (title) =>{
    document.title = Helper.websiteName;
};

Helper.getConfig = () => {
    return config;
};

Helper.post = (loc, body) => {
    return fetch(Helper.getConfig().api.location+loc, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
    });
};

Helper.password = {};
Helper.password.rule = (password,repeat)=>{
    return password && repeat && password.length > 7 && password === repeat;
};

Helper.message = (content,success) => {
    return {
        content: content,
        success: success
    };
};

Helper.postWithToken = (loc, body) => {
    body.token = Session.getSessionItem(Session.user).token;
    return Helper.post(loc,body);
};

export default Helper;