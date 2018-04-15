function message(msg,success){
    return {
        content: msg,
        success: success
    };
}

module.exports = {
    message: message
};