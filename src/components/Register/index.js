import React, { Component } from 'react';
import './style.css';

export default class Register extends Component {
    static propTypes = {}
    static defaultProps = {}
    state = {}

    render() {
        return (
            <div className={this.constructor.name} >
                <input label="E-mail:" type="email" name="email" required />
                <input label="Password:" type="password" name="password" required />
                <input label="Repeat password: " type="password" name="password-r" required />
            </div>
        );
    }
};