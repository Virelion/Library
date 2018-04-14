const config = require('./config');
var Helper = {};

Helper.websiteName = "scrumbox";
Helper.title = Helper.title || {};

Helper.title.set = (title) =>{
    document.title = title + " | " + Helper.websiteName;
};

Helper.title.reset = (title) =>{
    document.title = Helper.websiteName;
};

Helper.getConfig = function (){
    return config;
};

export default Helper;