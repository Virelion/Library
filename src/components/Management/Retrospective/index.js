import React, { Component } from 'react';
import './style.css';
import MessageBox from './../../MessageBox';
import IssueItem from './../../EditableRow/IssueItem';
import Management from './../Management';
import Helper from './../../../Helper';
import './style.css';

export default class Retrospective extends Management {
    static propTypes = {}
    static defaultProps = {}
    state = {
        items: false,
        types: false
    }
    
    componentDidMount(){
        this.refresh();
    }
    /*
     * _id: Mongoose.Schema.ObjectId,
        name: { type: String, required: true },
        description: { type: String, required: true },
        type: issueTypes,
     */
    
    supplyFields(item,list){
        var fields = [
            { type: 'hidden', name:'_id', value: item._id},
            { type: 'hidden', name:'retrospective', value: this.props.match.params.id},
            { type: 'text', name:'name', value: item.name, editable:true, validation: {required: true, rules:[]}},
            { type: 'textarea', name: 'description', value: item.description, editable: true, validation: {required: true, rules: []} },
            { type: 'select', name:'type', value: item.type, editable:true, 
                model: { list: this.state.types, choice: item.type}, validation: {required: true, rules: []}},
            { type: 'hidden', name:'upVote', value: item.upVote}
        ]
        return fields;
    }
    
    addItem(data){
        this.send("/issue/create",data);
    }
    
    deleteItem(data){
        this.send("/issue/delete",data);
    }
    
    editItem(data){
        this.send("/issue/edit",data);
    }
    
    freshItem(){
        var fields = this.supplyFields({
            name: "",
            description: "",
            type: "0"
        },this.state.types);
        fields.forEach((field) => field.editable = true);
        return fields;
    }
    
    refresh(){
        let id = this.props.match.params.id;
        Helper.postWithToken("/issue/list",{retrospective: id})
                .then(res => res.json())
                .then(data => {
                    var sorted = data.issues.sort((a,b)=>{
                        let compare = a.type[0].localeCompare(b.type[0]);
                        if(compare===0){
                           return b.upVote.length - a.upVote.length;
                        }
                        return compare;
                    });
                    if(data.message.success){
                        this.setState({items: sorted, types: data.issueTypes})
                    } else {
                        this.setState({message: data.message})
                    }
                }).catch(()=>this.setState({message:Helper.message("Cannot connect",false)}));
    }

    render() {
        console.log(this);
        var content;
        if(this.state.items){
            content = (this.state.items.map(item => (
                                <IssueItem key={item._id} presentation={this.props.presentation} refresh={()=>this.refresh()} onDelete={()=>this.deleteItem(item)} onConfirm={(item)=>this.editItem(item)} fields={this.supplyFields(item,this.state.teams)} />
                               
                            )));
        } else {
            content = (null);
        }
        return (
        <div className={this.constructor.name} >
            <MessageBox message={this.state.message} />
                {content&&!this.props.presentation?<IssueItem addMode={true} onConfirm={(row)=>this.addItem(row)} fields={this.freshItem()} />:null}
                    {content}
        </div>
        );
    }
};