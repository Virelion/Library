import React, { Component } from 'react';
import Helper from './../../Helper';

import './style.css';

export default class NotFound extends Component {
    static propTypes = {}
    static defaultProps = {}
    state = {}

    render() {
        Helper.title.set("404 not found");
        return (
            <div className={this.constructor.name} >
                <h1>
                    NotFound
                </h1>
            </div>
        );
    }
};