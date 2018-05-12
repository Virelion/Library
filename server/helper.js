function message(msg,success){
    if(success){
        console.log(msg);
    } else {
        console.warn(msg);
    }
    return {
        content: msg,
        success: success
    };
}

module.exports = {
    message: message
};