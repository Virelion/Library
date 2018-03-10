var Helper = Helper || {};

//title
Helper.websiteName = "Library";
Helper.title = Helper.title || {};

Helper.title.set = (title) =>{
    document.title = title + " | " + Helper.websiteName;
};

Helper.title.reset = (title) =>{
    document.title = Helper.websiteName;
};

export default Helper;