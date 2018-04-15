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

Helper.post = (body) => {
    return fetch(Helper.getConfig().api.location+'/sign-in', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
    });
};

export default Helper;