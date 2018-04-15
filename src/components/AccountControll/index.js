import React, { Component } from 'react';
import './style.css';
import Helper from './../../Helper';
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
            if(tag === "user"){
                console.log("AccountControll callback: set state");
                this.refresh();
            }
        })
    }
    
    refresh(){
        this.setState({logged: Session.getSessionItem('user')});
    }
    
    render() {
        Helper.title.set(this.constructor.name);
        if(this.state.logged){
            return (
              <div class={this.constructor.name} >
                {this.state.logged.user.name}
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