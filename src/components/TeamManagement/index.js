import React, { Component } from 'react';
import './style.css';
import MessageBox from './../MessageBox';
import AddIco from './../AddIco';
import EditableRow from './../EditableRow';

import Helper from './../../Helper';

export default class TeamManagement extends Component {
    static propTypes = {}
    static defaultProps = {}
    state = {}
    
    onConfirm(confirmedRow){
        console.log(confirmedRow);
        
        Helper.postWithToken("/team/edit",{data: confirmedRow})
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
                                <EditableRow key={item._id} onConfirm={this.onConfirm} fields={this.supplyFields(item,this.state.teams)} />
                               
                            )));
        } else {
            content = (null);
        }
        return (
        <div className={this.constructor.name} >
            <MessageBox message={this.state.message} />
            <table>
                <tbody>
                {content?<tr key="label"><th>Name</th><th></th></tr> :null}
                    {content}
                </tbody>
            </table>
        </div>
        );
    }
};