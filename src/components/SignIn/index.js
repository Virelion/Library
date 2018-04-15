import React, { Component } from 'react';
import Helper from './../../Helper';
import Session from './../../Session';
import LabeledInput from './../LabeledInput';
import MessageBox from './../MessageBox';
import { Redirect } from 'react-router'
import './style.css';

export default class SignIn extends Component {
    static propTypes = {}
    static defaultProps = {}
    state = {}

    constructor(props){
        super(props);
        this.state = {
          user: "",
          password: "",
          message: false,
          logged: false
        }
    }

    handleEmailChange(e) {
        this.setState({user: e.target.value});
    }
    
    handlePasswordChange(e) {
        this.setState({password: e.target.value});
    }

    signIn(event){        
        var body = {
                name: this.state.user,
                password: this.state.password
            }; 
        Helper.post(body)
        .then(res => res.json())
        .then(data =>{ 
            if(data.success){
                Session.setSessionItem(Session.user,data);
                this.setState({logged: true, message: false});
            } else {
                this.setState({logged:false, message: data.message});
            }
        })
        .catch((err)=>{
            this.setState({logged:false, message: "Server offline, cannot log in" });
        });
    }

    render() {
        Helper.title.set("Sign in");
        if(this.state.logged){
            return (<Redirect to="/"/>);
        }
        return (
            <form>
                <div className={this.constructor.name} >
                    <MessageBox message={this.state.message} type="MessageBox-negative" />
                    <LabeledInput type="text" name="user" placeholder="User name" value={this.state.user} onChange={this.handleEmailChange.bind(this)} />
                    <LabeledInput type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange.bind(this)}/>
                    <LabeledInput type="button"  onClick={this.signIn.bind(this)} value="Sign in" />
                </div>
            </form>
        );
    }
};