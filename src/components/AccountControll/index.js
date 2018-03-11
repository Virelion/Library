import React, { Component } from 'react';
import './style.css';
import Helper from './../../Helper';
import CustomNavLink from './../CustomNavLink';

export default class AccountControll extends Component {
  static propTypes = {}
  static defaultProps = {}
  state = {}

  render() {
    Helper.title.set(this.constructor.name);
    if(this.props.logged){
        return (
          <div class={this.constructor.name} >
            Hello
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