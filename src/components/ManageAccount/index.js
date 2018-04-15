import React, { Component } from 'react';
import CustomNavLink from './../CustomNavLink';
import Session from './../../Session';
import LabeledInput from './../LabeledInput';
import MessageBox from './../MessageBox';
import './style.css';

export default class ManageAccount extends Component {
    static propTypes = {}
    static defaultProps = {}
    state = {}
    
    componentDidMount(){
        this.refresh();
    }
    
    refresh(){
        this.setState({logged: Session.getSessionItem(Session.user)});
    }
    
    handlePasswordRepeatChange(e) {
        this.setState({passwordRepeat: e.target.value});
    }
    
    handlePasswordChange(e) {
        this.setState({password: e.target.value});
    }
    
    changePassword(e){
        e.preventDefault();
    }
    
    render() {
        if(this.state.logged){
            return (
                <form onSubmit={this.changePassword.bind(this)}>
                    <div className={this.constructor.name}  >
                        <MessageBox message={this.state.message} type="MessageBox-negative" />
                        <LabeledInput type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange.bind(this)}/>
                        <LabeledInput type="password" name="passwordRepeat" placeholder="Repeat password" value={this.state.passwordRepeat} onChange={this.handlePasswordRepeatChange.bind(this)}/>
                        <LabeledInput type="submit" value="Accept" />
                    </div>
                </form>
            );
        } else {
            return (null);
        }
    }
};