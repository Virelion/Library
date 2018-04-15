import React, { Component } from 'react';
import Session from './../../Session';
import MessageBox from './../MessageBox';
import Helper from './../../Helper';
import './style.css';

export default class ManageAccount extends Component {
    static propTypes = {}
    static defaultProps = {}
    state = {}
    
    componentDidMount(){
        this.setState({
            logged: Session.getSessionItem(Session.user),
            message: false,
            passwordRepeat: '',
            password: ''
        });
    }
    
    handlePasswordRepeatChange(e) {
        this.setState({passwordRepeat: e.target.value});
    }
    
    handlePasswordChange(e) {
        this.setState({password: e.target.value});
    }
    
    changePassword(e){
        e.preventDefault();
        if(this.state.password 
                && this.state.passwordRepeat 
                && this.state.password.length > 7 
                && this.state.password === this.state.passwordRepeat){
            var payload = {
                password: this.state.password,
            };
            Helper.postWithToken('/changePassword',payload);
        } else {
            this.setState({message: "Passwords not match or to short (8 characters min)"});
        }
    }
    
    render() {
        if(this.state.logged){
            return (
                <form onSubmit={this.changePassword.bind(this)}>
                    <div className={this.constructor.name}  >
                        <MessageBox message={this.state.message} type="MessageBox-negative" />
                        <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange.bind(this)} />
                        <input type="password" name="passwordRepeat" placeholder="Repeat password" value={this.state.passwordRepeat} onChange={this.handlePasswordRepeatChange.bind(this)} />
                        <input type="submit" value="Accept" />
                    </div>
                </form>
            );
        } else {
            return (null);
        }
    }
};