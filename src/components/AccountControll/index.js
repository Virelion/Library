import React, { Component } from 'react';
import NavLink from 'react-dom'
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
          <div class={this.constructor.name} >
            <CustomNavLink to='/sign-in'>Sign in</CustomNavLink>
          </div>
        );
    }
  }
};