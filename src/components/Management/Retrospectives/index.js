import React from 'react';
import MessageBox from './../../MessageBox';
import EditableRow from './../../EditableRow';
import Management from './../Management';
import Helper from './../../../Helper';
import './style.css';

export default class Retrospectives extends Management {
    static propTypes = {}
    static defaultProps = {}
    
    state = {
    }
    
    
    editItem(data){
        this.send("/retrospective/edit",data);
    }
    
    addItem(data){
        this.send("/retrospective/create",data);
    }
    
    deleteItem(data){
        this.send("/retrospective/delete",data);
    }
    
    freshItem(){
        var fields = this.supplyFields({
            name: ""
        },this.state.teams);
        fields.forEach((field) => field.editable = true);
        return fields;
    }
    
    supplyFields(item,list){
        var fields = [
            { type: 'hidden', name:'_id', value: item._id},
            { type: 'date', name:'date', value: item.date, editable: true },
            { type: 'text', name:'name', value: item.name, editable:true},
        ]
        return fields;
    }
    
    constructor(props){
        super(props);
        this.state = {
            teams: false,
            message: false,
            items: false
        }
    }
    
    refresh(){
        Helper.postWithToken("/retrospective/list",{})
                .then(res => res.json())
                .then(data => {
                    if(data.message.success){
                        this.setState({items: data.retrospectives})
                    } else {
                        this.setState({message: data.message})
                    }
                }).catch(()=>this.setState({message:Helper.message("Cannot connect",false)}));
    }
    
    render() {
        var content;
        if(this.state.items){
            content = (this.state.items.map(item => (
                                <EditableRow key={item._id} onDelete={()=>this.deleteItem(item)} onConfirm={(item)=>this.editItem(item)} fields={this.supplyFields(item,this.state.teams)} />
                               
                            )));
        } else {
            content = (null);
        }
        return (
        <div className={this.constructor.name} >
            <MessageBox message={this.state.message} />
            <table>
                <tbody>
                {content?<EditableRow addMode={true} onConfirm={(row)=>this.addItem(row)} fields={this.freshItem()} />:null}
                {content?<tr key="label"><th>Name</th><th></th></tr> :null}
                    {content}
                </tbody>
            </table>
        </div>
        );
    }
};