import React, { Component } from 'react';
import Helper from './../../Helper';
import './style.css';

export default class App extends Component {
  static propTypes = {}
  static defaultProps = {}
  state = {}

  render() {
    Helper.title.reset();
    return (
      <div className={this.constructor.name} >
        <h1>
          App
        </h1>
      </div>
    );
  }
};
