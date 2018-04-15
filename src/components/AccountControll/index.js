import React, { Component } from 'react';
import './style.css';
import CustomNavLink from './../CustomNavLink';
import Session from './../../Session';

export default class AccountControll extends Component {
    static propTypes = {}
    static defaultProps = {}
    state = {}
    
    componentDidMount(){
        this.refresh();
        Session.setOnSessionItemChange((tag,item)=>{
            console.log("AccountControll callback");
            if(tag === Session.user){
                console.log("AccountControll callback: set state");
                this.refresh();
            }
        })
    }
    
    refresh(){
        this.setState({logged: Session.getSessionItem(Session.user)});
    }
    
    signOut(){
        Session.setSessionItem(Session.user,false);
    }
    
    render() {
        if(this.state.logged){
            return (
                <div class={this.constructor.name} >
                    <CustomNavLink to='/sign_in' onClick={this.signOut.bind(this)}>Sign Out</CustomNavLink>
                    <CustomNavLink to='/account'>{this.state.logged.user.name}</CustomNavLink>
                </div>
            );
        } else {
            return (
                <div className={this.constructor.name} >
                    <CustomNavLink to='/sign_in'>Sign in</CustomNavLink>
                    <CustomNavLink to='/register'>Register</CustomNavLink>
                </div>
            );
        }
    }
};