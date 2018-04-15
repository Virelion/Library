import React, { Component } from 'react';

import './style.css';

export default class LabeledInput extends Component {
    static propTypes = {}
    static defaultProps = {}
    state = {}

    render() {
            return (
                <input {...this.props} />
            );
    }
};