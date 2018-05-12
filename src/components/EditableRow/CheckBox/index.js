import React, { Component } from 'react';
import './style.css';

export default class CheckBox extends Component {
    static propTypes = {}
    static defaultProps = {
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
        console.log(e.target);
        this.setState({value: e.target.checked});
    }

    render() {
        if(!this.props.editable){
            return (<input className="checkbox" type={this.props.type} checked={this.state.value} disabled />);
        } else {
            return (<input className="checkbox" type={this.props.type} checked={this.state.value} onChange={this.onValueChange.bind(this)} />);
        }
    }
};