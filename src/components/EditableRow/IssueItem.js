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
                <span className="upVoted">
                    <button className="rowButton input" onClick={this.withdraw.bind(this)} >↓ {this.myRefs.upVote.getCurrentField().value.length}</button>
                </span>
            );
        } else {
            return (
                <span className="upVote">  
                   <button className="rowButton input" onClick={this.upVote.bind(this)} >↑ {this.myRefs.upVote.getCurrentField().value.length}</button>
                </span>
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
    
    getIssueClass() {
        console.log(this.fields);
        let index = 0;
        if(!(this.myRefs.type && this.myRefs.type.getCurrentField() && this.myRefs.type.getCurrentField().value))
            index= this.fields[4].props.value[0];
        else {
            index= this.myRefs.type.getCurrentField().value[0];
        }
        return !this.state.editMode?this.fields[4].props.model.list[index]:"";
    }

    render(){
        this.createComponents();
        if(this.props.addMode && !this.state.editMode){
            return (<button  className="rowButton input" onClick={this.onChange.bind(this)} >Add</button>);
        } else {
            return (
                    <div className={this.getIssueClass()+" IssueItem "+(this.state.editMode?"editMode":"reviewMode") } >
                        <div>
                                {this.upVoteButton()}
                            {this.fields[4]}{this.fields[2]}
                        </div>
                        <div className="description">{this.fields[3]}</div>
                        
                        {this.innerMessages()}
                        <div className="controlButtons">
                                {!this.props.presentation?<div className="controlBoard">
                                    <button className="rowButton input" onClick={this.onChange.bind(this)} >{this.state.editMode ? "Confirm": "Edit"}</button>
                                    {this.state.editMode?<button  className="rowButton input" onClick={this.cancel.bind(this)} >Cancel</button>:null}  
                                    {this.props.onDelete?<button className="rowButton input" onClick={this.delete.bind(this)} >Delete</button>:null}
                                </div>:null}
                        </div>
                    </div>
              );  
        }
    }
}