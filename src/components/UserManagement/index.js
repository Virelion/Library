import React, { Component } from 'react';
import './style.css';
import MessageBox from './../MessageBox';
import EditableRow from './../EditableRow';
import Helper from './../../Helper';

export default class UserManagement extends Component {
    static propTypes = {}
    static defaultProps = {}
    state = {}
    
    onConfirm(confirmedRow){
        console.log(confirmedRow);
        
        Helper.postWithToken("/user/edit",{data: confirmedRow})
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
        var choice = item.team ? item.team : "0";
        var fields = [
            { type: 'text', name:'_id', value: item._id, editable:false},
            { type: 'checkbox', name:'admin', value: item.admin, editable:true},
            { type: 'select', name:'team', value: item.team, editable:true, 
                model: { list: list, choice: choice}}
        ]
        return fields;
    }
    
    constructor(props){
        super(props);
        this.state = {
            message: false,
            items: false,
            teams: false
        }
    }
    
    componentDidMount(){
        this.refresh();
    }
    
    refresh(){
        Helper.postWithToken("/user/list",{})
                .then(res => res.json())
                .then(data => {
                    if(data.message.success){
                        this.setState({items: data.users})
                    } else {
                        this.setState({message: data.message})
                    }
                    
                    Helper.postWithToken("/team/list",{})
                    .then(res => res.json())
                    .then(data => {
                        if(data.message.success){
                            var teamList = {};
                            teamList["0"] = '';
                            data.teams.forEach((item)=>{ teamList[item._id] = item.name; });;
                            this.setState({teams: teamList})
                        } else {
                            this.setState({message: data.message})
                        }
                    }).catch(()=>this.setState({message:Helper.message("Cannot connect",false)}));
                    
                }).catch(()=>this.setState({message:Helper.message("Cannot connect",false)}));
    }
    
    render() {
        var content;
        if(this.state.items && this.state.teams){
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
                {content?<tr key="label"><th>Name</th><th>Admin</th><th>Team</th><th></th></tr>:null}
                    {content}
                </tbody>
            </table>
        </div>
        );
    }
};