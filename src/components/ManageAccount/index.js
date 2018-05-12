import React, { Component } from 'react';
import MessageBox from './../MessageBox';
import Helper from './../../Helper';
import './style.css';

export default class ManageAccount extends Component {
    static propTypes = {}
    static defaultProps = {}
    state = {}
    
    componentDidMount(){
        this.setState({
            message: false,
            passwordRepeat: '',
            oldPassword: '',
            password: ''
        });
    }
    
    handlePasswordRepeatChange(e) {
        this.setState({passwordRepeat: e.target.value});
    }
    
    handlePasswordChange(e) {
        this.setState({password: e.target.value});
    }
    
    handleOldPassword(e) {
        this.setState({oldPassword: e.target.value});
    }
    
    changePassword(e){
        e.preventDefault();
        if(     this.state.oldPassword
                && Helper.password.rule(this.state.password,this.state.passwordRepeat)){
            var payload = {
                password: this.state.password,
                oldPassword: this.state.oldPassword
            };
            Helper.postWithToken('/changePassword',payload)
            .then(res => res.json())
            .then(data =>{ 
                this.setState({message: data.message, password:'', passwordRepeat:'', oldPassword:''});
            })
        } else {
            this.setState({message: Helper.message("Passwords not match or to short (8 characters min)",false)});
        }
    }
    
    render() {
        return (
                <form onSubmit={this.changePassword.bind(this)}>
                    <div className={this.constructor.name}  >
                        <MessageBox message={this.state.message} />
                        <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange.bind(this)} />
                        <input type="password" name="passwordRepeat" placeholder="Repeat password" value={this.state.passwordRepeat} onChange={this.handlePasswordRepeatChange.bind(this)} />
                        <input type="password" name="oldPassword" placeholder="Old password" value={this.state.oldPassword} onChange={this.handleOldPassword.bind(this)} />
                        <input type="submit" value="Accept" />
                    </div>
                </form>
        );
    }
};