import React from 'react';
import AbstractField from './../AbstractField';
import './style.css';

export default class CheckBox extends AbstractField {
    static propTypes = {}
    static defaultProps = {
    }
    
    constructor(props){
        super(props);
        this.state = {
            value: this.props.value,
            editable: this.props.editable
        };
    }
    
    state = {
        value: '',
        model: ''
    }

    onValueChange(e) {
        this.setState({value: e.target.checked});
    }

    renderField() {
        if(!this.props.editable){
            return (<input className="checkbox" type="checkbox" checked={this.state.value} disabled />);
        } else {
            return (<input className="checkbox" type="checkbox" checked={this.state.value} onChange={this.onValueChange.bind(this)} />);
        }
    }
};