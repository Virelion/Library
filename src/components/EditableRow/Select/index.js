import React from 'react';
import AbstractField from './../AbstractField';
import './style.css';

export default class Select extends AbstractField {
    static propTypes = {}
    static defaultProps = {
    }
    
    constructor(props){
        super(props);
        this.state = {
            value: this.props.value,
            editable: this.props.editable
        }
        this.state = {
            value: this.props.model.choice
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
        return (<select className="input" onChange={this.onValueChange.bind(this)} value={this.state.value} disabled={!this.props.editable} >
                    {Object.keys(this.props.model.list).map((key,i)=>{
                        return (<option key={key} value={key} >{this.props.model.list[key]}</option>);  
                    })}
                    </select>);
        
    }
};