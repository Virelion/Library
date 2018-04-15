import React, { Component } from 'react';
import './style.css';

export default class LoadingIco extends Component {
    static propTypes = {}
    static defaultProps = {}
    state = {}

    render() {
        return (
            <div className={this.constructor.name} >
                Loading
            </div>
        );
    }
};