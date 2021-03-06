import React from 'react';
import './style.css';
import MessageBox from './../../MessageBox';
import EditableRow from './../../EditableRow';
import Management from './../Management';
import Helper from './../../../Helper';

export default class TeamManagement extends Management {
    static propTypes = {}
    static defaultProps = {}
    state = {}
    
    editItem(data){
        this.send("/team/edit",data);
    }
    
    addItem(data){
        this.send("/team/create",data);
    }
    
    deleteItem(data){
        this.send("/team/delete",data);
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
            { type: 'text', name:'name', value: item.name, editable:true, validation: {required: true, rules:[]}},
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
        Helper.postWithToken("/team/list",{})
                .then(res => res.json())
                .then(data => {
                    if(data.message.success){
                        this.setState({items: data.teams})
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
                {content?<tr key="label"><th>Name</th><th></th><th></th></tr> :null}
                    {content}
                </tbody>
            </table>
        </div>
        );
    }
};