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
                <h1>Simple library</h1>
                <p>
                    Find your reading experience enhanced with moder library technology. Find your book and borrow it without even geting out from home. Do not worry we will hadle everything.
                </p>
            </div>
        );
    }
};
