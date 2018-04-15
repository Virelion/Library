
class Session {
    callbacks = [];
    getSessionItem(tag){
        return JSON.parse(sessionStorage.getItem(tag));
    };
    
    setSessionItem(tag,item){
        sessionStorage.setItem(tag,JSON.stringify(item));
        this.onSessionChange(tag,item);
    };
    
    setOnSessionItemChange(callback){
        this.callbacks.push(callback);
    }
    
    onSessionChange(tag,item){
        for(var i = 0; i < this.callbacks.length; i++){
            this.callbacks[i](tag,item);
        }
    }
}
const session = new Session();
export default session;