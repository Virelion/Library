import React from 'react';
import AbstractField from './../AbstractField';
import './style.css';

export default class DateInput extends AbstractField {
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

    renderField() {
        if(!this.props.editable){
            return (<input className="input" type='date' value={this.state.value} disabled />);
        } else {
            return (<input className="input" type='date' value={this.state.value} onChange={this.onValueChange.bind(this)} />);
        }
    }
};