import React, { Component } from 'react';
import './style.css';

export default class AddIco extends Component {
    static propTypes = {}
    static defaultProps = {}
    state = {}

    render() {
        return (
                <a href={this.props.href}>+</a>
        );
    }
};