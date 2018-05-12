import React from 'react';
import AbstractField from './../AbstractField';
import './style.css';

export default class InputField extends AbstractField {
    static propTypes = {}
    
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
            return (<input className="input" placeholder={this.props.placeholder} type='text' value={this.state.value} disabled />);
        } else {
            return (<input className="input" placeholder={this.props.placeholder} type='text' value={this.state.value} onChange={this.onValueChange.bind(this)} />);
        }
    }
};