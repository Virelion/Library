import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import './style.css';
import CustomNavLink from './../CustomNavLink';
import MessageBox from './../MessageBox';
import Session from './../../Session';
import Helper from './../../Helper';

export default class UserManagement extends Component {
    static propTypes = {}
    static defaultProps = {}
    state = {}
    
    constructor(props){
        super(props);
        this.state = {
            message: false,
            items: false
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
                }).catch(()=>this.setState({message:Helper.message("Cannot connect",false)}));
    }
    
    render() {
        var content;
        if(this.state.items){
            content = (this.state.items.map(item => (
                                <tr key={item._id} ><td>{item._id}</td><td>{item.admin? "y" : "n"}</td><td>{item.team}</td></tr>
                            )));
        } else {
            content = (null);
        }
        return (
        <div className={this.constructor.name} >
            <MessageBox message={this.state.message} />
            <table>
                <tbody>
                <tr key="label"><th>Name</th><th>Admin</th><th>Team</th></tr>
                    {content}
                </tbody>
            </table>
        </div>
        );
    }
};