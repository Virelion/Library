import React, { Component } from 'react';
import LabeledInput from './../LabeledInput';
import './style.css';

export default class Register extends Component {
  static propTypes = {}
  static defaultProps = {}
  state = {}

  render() {
    return (
      <div className={this.constructor.name} >
        <LabeledInput label="E-mail:" type="email" name="email" required />
        <LabeledInput label="Password:" type="password" name="password" required />
        <LabeledInput label="Repeat password: " type="password" name="password-r" required />
      </div>
    );
  }
};