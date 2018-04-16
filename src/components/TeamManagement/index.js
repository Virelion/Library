import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import './style.css';
import CustomNavLink from './../CustomNavLink';
import MessageBox from './../MessageBox';
import Session from './../../Session';
import Helper from './../../Helper';

export default class TeamManagement extends Component {
    static propTypes = {}
    static defaultProps = {}
    state = {}
    
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
                                <tr key={item._id} ><td>{item.name}</td></tr>
                            )));
        } else {
            content = (null);
        }
        return (
        <div className={this.constructor.name} >
            <MessageBox message={this.state.message} />
            <table>
                <tbody>
                    <tr key="label"><th>Name</th></tr>
                    {content}
                </tbody>
            </table>
        </div>
        );
    }
};