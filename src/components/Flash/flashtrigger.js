/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class Trigger{
    flash = false;
    subscribe(me){
        this.flash = me;
    }
    
    trigger(){
        if(this.flash){
            console.log("tr",this.flash);
            this.flash.animate();
        } else {
            console.log("no flash");
        }
    }   
}

var trigger = new Trigger();
export default trigger;
