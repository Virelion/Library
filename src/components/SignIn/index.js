import React, { Component } from 'react';
import Helper from './../../Helper';
import Session from './../../Session';
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
        event.preventDefault();
        var body = {
                name: this.state.user,
                password: this.state.password
            }; 
        Helper.post('/sign-in',body)
        .then(res => res.json())
        .then(data =>{ 
            if(data.message.success){
                Session.setSessionItem(Session.user,data);
                this.setState({message: false});
            } else {
                this.setState({message: data.message});
            }
        })
        .catch((err)=>{
            this.setState({message:Helper.message("Server offline, cannot log in",false)});
        });
    }

    render() {
        Helper.title.set("Sign in");
        if(this.state.logged){
            return (<Redirect to="/" />);
        }
        return (
            <div className={this.constructor.name}  >
                <div className="logoFront">
                    <img alt="logo" id="article-logo" src="logo.png" /> 
                    <h1>ScrumBox</h1>
                </div>
                <form onSubmit={this.signIn.bind(this)}>
                    <MessageBox message={this.state.message} />
                    <input type="text" name="user" placeholder="User name" value={this.state.user} onChange={this.handleEmailChange.bind(this)} />
                    <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange.bind(this)}/>
                    <input type="submit" value="Sign in" />
                </form>
            </div>
        );
    }
};