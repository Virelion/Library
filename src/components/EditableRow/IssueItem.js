import EditableRow from './index';
import React from 'react';
import Helper from './../../Helper';
import Session from './../../Session';

export default class IssueItem extends EditableRow {
        
    upVoteButton(){
        if(!(this.myRefs.upVote && this.myRefs.upVote.getCurrentField() && this.myRefs.upVote.getCurrentField().value))
            return (null);
        if(this.myRefs.upVote && this.myRefs.upVote.getCurrentField().value.includes(Session.getSessionItem(Session.user).user.name)){
            return (
                                <button className="rowButton input upVoted" onClick={this.withdraw.bind(this)} >{this.myRefs.upVote.getCurrentField().value.length}</button>
                        );
        } else {
            return (
                                <button className="rowButton input upVote" onClick={this.upVote.bind(this)} >{this.myRefs.upVote.getCurrentField().value.length}</button>
                        );
        }
    
        
    }
        
    upVote(){
         Helper.postWithToken('/issue/upvote',{ data : {_id: this.myRefs._id.getCurrentField().value}})
                .then(res => res.json())
                .then(data => {
                    this.props.refresh();
                }).catch(()=>this.setState({message:Helper.message("Cannot connect",false)}));
    }    
    
    withdraw(){
         Helper.postWithToken('/issue/withdraw',{ data : {_id: this.myRefs._id.getCurrentField().value}})
                .then(res => res.json())
                .then(data => {
                    this.props.refresh();
                }).catch(()=>this.setState({message:Helper.message("Cannot connect",false)}));
    }
    
    renderButtons(){
          return (<span><button className="rowButton input" onClick={this.onChange.bind(this)} >{this.state.editMode ? "Confirm": "Edit"}</button>
                  {this.state.editMode?<button  className="rowButton input" onClick={this.cancel.bind(this)} >Cancel</button>:null}  
                          </span>
                  );
    }  
    
    render(){
        this.upVoteButton();
        console.log("fields",this.myRefs);
        console.log("type",this.myRefs.type);
        this.createComponents();
        if(this.props.addMode && !this.state.editMode){
            return (<button  className="rowButton input" onClick={this.onChange.bind(this)} >Add</button>);
        } else {
            return (
                    <div className={" IssueItem "+(this.state.editMode?"editMode":"reviewMode") } >
                        <div>
                            {this.fields[4]}{this.fields[2]}
                        </div>
                        <div className="description">{this.fields[3]}</div>
                        
                        {this.innerMessages()}
                        <div className="controlButtons">
                                {this.upVoteButton()}
                                <button className="rowButton input" onClick={this.onChange.bind(this)} >{this.state.editMode ? "Confirm": "Edit"}</button>
                                {this.state.editMode?<button  className="rowButton input" onClick={this.cancel.bind(this)} >Cancel</button>:null}  
                                {this.props.onDelete?<button className="rowButton input" onClick={this.delete.bind(this)} >Delete</button>:null}
                        </div>
                    </div>
              );  
        }
    }
}