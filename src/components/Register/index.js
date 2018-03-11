// src/components/About/index.js
import React, { Component } from 'react';
import Helper from './../../Helper';
import LabeledInput from './../LabeledInput';
import './style.css';

export default class Register extends Component {
  static propTypes = {}
  static defaultProps = {}
  state = {}

  render() {
    Helper.title.set("Register");
    return (
      <div className={this.constructor.name} >
        <LabeledInput label="E-mail:" type="email" name="email" required />
        <LabeledInput label="Password:" type="password" name="password" required />
        <LabeledInput label="Repeat password: " type="password" name="password-r" required />
      </div>
    );
  }
};