// src/components/About/index.js
import React, { Component } from 'react';
import Helper from './../../Helper';
import LabeledInput from './../LabeledInput';
import './style.css';

export default class SignIn extends Component {
  static propTypes = {}
  static defaultProps = {}
  state = {}

    constructor(props){
          super(props);
          this.state = {
            user: "",
            password: ""
          }
      }

    handleEmailChange(e) {
       this.setState({user: e.target.value});
    }
    
    handlePasswordChange(e) {
       this.setState({password: e.target.value});
    }

  signIn(event){
      console.log(this.state.password +" "+ this.state.user);
    fetch('http://localhost:9000/api/sign-in ', {
     method: 'POST',
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
     },
     body: JSON.stringify({
       user: this.state.user,
       password: this.state.password,
     })
   })
  }

  render() {
    Helper.title.set("Sign in");
    return (
        <form>
            <div className={this.constructor.name} >
                <LabeledInput type="text" name="user" placeholder="User name" value={this.state.user} onChange={this.handleEmailChange.bind(this)} />
                <LabeledInput type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange.bind(this)}/>
                <LabeledInput type="button" onClick={this.signIn.bind(this)} value="Sign in" />
            </div>
        </form>
      
    );
  }
};