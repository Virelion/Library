// src/components/About/index.js
import React, { Component } from 'react';
import Helper from './../../Helper';

import './style.css';

export default class LabeledInput extends Component {
  static propTypes = {}
  static defaultProps = {}
  state = {}

  render() {
    return (
        <label className={this.constructor.name}>
            <span className='LabeledInput-label'>{this.props.label}</span> <input {...this.props} />
        </label>
    );
  }
};