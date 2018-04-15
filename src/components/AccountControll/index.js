import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import './style.css';
import CustomNavLink from './../CustomNavLink';
import Session from './../../Session';

export default class AccountControll extends Component {
    static propTypes = {}
    static defaultProps = {}
    state = {}
    
    signOut(){
        Session.setSessionItem(Session.user,false);
    }
    
    render() {
        var logged = Session.getSessionItem(Session.user);
        if(logged){
            return (
                <div className={this.constructor.name} >
                    <NavLink to='/' onClick={this.signOut.bind(this)}>Sign Out</NavLink>
                    <CustomNavLink to='/account'>{logged.user.name}</CustomNavLink>
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