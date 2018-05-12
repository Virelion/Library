import React, { Component } from 'react';
import './style.css';

export default class InputField extends Component {
    static propTypes = {}
    static defaultProps = {
        editable: false,
        type: 'text'
    }
    
    constructor(props){
        super(props);
        this.state = {
            value: this.props.value,
            editable: this.props.editable
        }
    }
    
    state = {
        value: '',
        model: ''
    }

    onValueChange(e) {
        this.setState({value: e.target.value});
    }

    render() {
        if(!this.props.editable){
            return (<input className="input" type={this.props.type} value={this.state.value} disabled />);
        } else {
            return (<input className="input" type={this.props.type} value={this.state.value} onChange={this.onValueChange.bind(this)} />);
        }
    }
};