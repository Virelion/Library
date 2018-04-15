// src/components/About/index.js
import React, { Component } from 'react';

import './style.css';

export default class LabeledInput extends Component {
  static propTypes = {}
  static defaultProps = {}
  state = {}

  render() {
    if(this.props.label){
        return (
            <label className={this.constructor.name}>
                <span className='LabeledInput-label'>{this.props.label}</span> 

                <input {...this.props} />
            </label>
        );
    }
    else {
        return (
            <label className={this.constructor.name}>
                <input {...this.props} />
            </label>
        );
    }
  }
};