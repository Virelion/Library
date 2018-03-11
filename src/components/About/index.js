import React, { Component } from 'react';
import './style.css';
import Helper from './../../Helper';

export default class About extends Component {
  static propTypes = {}
  static defaultProps = {}
  state = {}

  render() {
    Helper.title.set("About");
    return (
      <div className={this.constructor.name} >
        <h1>
          About
        </h1>
      </div>
    );
  }
};