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
        if(this.props.type==='select'){
            this.state = {
                value: this.props.model.list[this.props.model.choice]
            }
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
        if(this.props.type==='select'){
            if(!this.props.editable){
                return (<p>{this.state.value}</p>);
            } else {
                return (<select onChange={this.onValueChange.bind(this)} >
                            {this.props.model.list.map((item,i)=>{
                                return (<option>{item}</option>);  
                            })}
                            </select>);
            }
        } else {
            if(!this.props.editable){
                return (<p>{this.state.value}</p>);
            } else {
                return (<input type={this.props.type} value={this.state.value} onChange={this.onValueChange.bind(this)} />);
            }
        }
    }
};