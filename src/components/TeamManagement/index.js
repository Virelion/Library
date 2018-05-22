import React, { Component } from 'react';
import './style.css';
import MessageBox from './../MessageBox';
import EditableRow from './../EditableRow';

import Helper from './../../Helper';

export default class TeamManagement extends Component {
    static propTypes = {}
    static defaultProps = {}
    state = {}
    
    delete(id){
        console.log("delete "+id);
        Helper.postWithToken("/team/delete",{data: { _id: id} })
                .then(res => res.json())
                .then(data => {
                        if(data.message.success){
                        } else {
                            console.warn(data.message.content);
                        }
                    }
                );
    }
    
    onConfirm(confirmedRow){
        console.log(confirmedRow);
        var url = "";
        if(confirmedRow.add){
            url = "/team/create";
        } else {
            url = "/team/edit";
        }  
        Helper.postWithToken(url,{data: confirmedRow})
                .then(res => res.json())
                .then(data => {
                    if(data.message.success){
                        confirmedRow.setSuccess();
                    } else {
                        confirmedRow.setFailure();
                        console.warn(data.message.content);
                    }
                }
            );
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
    
    componentDidMount(){
        this.refresh();
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
                                <EditableRow key={item._id} onDelete={()=>this.delete(item._id)} onConfirm={this.onConfirm} fields={this.supplyFields(item,this.state.teams)} />
                               
                            )));
        } else {
            content = (null);
        }
        return (
        <div className={this.constructor.name} >
            <MessageBox message={this.state.message} />
            <table>
                <tbody>
                {content?<EditableRow addMode={true} onConfirm={this.onConfirm} fields={this.freshItem()} />:null}
                {content?<tr key="label"><th>Name</th><th></th></tr> :null}
                    {content}
                </tbody>
            </table>
        </div>
        );
    }
};