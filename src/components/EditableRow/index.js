import React, { Component } from 'react';
import InputField from './../InputField';
import './style.css';

/*
 props.fields = [
    { type: 'text', value: 'abcd', editable:true}
]
 */

export default class EditableRow extends Component {
    static propTypes = {}
    static defaultProps = {}
    
    state = {
        editMode: false
    }

    onChange(e) {
        this.setState({ editMode: !this.state.editMode });
    }

    render() {
        var fields = [ { type: 'submit', value: 'abcd', editable:true}, { type: 'text', value: 'bcda', editable:false} 
        , { type: 'select', model: {choice: 0, list: ['a','b','c','d']}, editable:true} ];
        var e = fields[0];
        return (<tr>
        {fields.map((field,i)=>{
            return (<td><InputField type={field.type} model={field.model} value={field.value} editable={field.editable && this.state.editMode} /></td>);
            })}
                
                <td><button onClick={this.onChange.bind(this)}>{this.state.editMode ? "Confirm": "Edit"}</button></td>        
                        
                </tr>
        
            );
        
    }
};