import React, { Component } from 'react';
import InputField from './InputField';
import Select from './Select';
import CheckBox from './CheckBox';
import Helper from './../../Helper';
import './style.css';

export default class EditableRow extends Component {
    static propTypes = {}
    static defaultProps = {}
    
    createComponent(field){
        switch(field.type){
            case 'select': return <Select className="rowItem" type={field.type} model={field.model} value={field.value} editable={field.editable && this.state.editMode} />;
            case 'text': return <InputField className="rowItem" type={field.type} value={field.value} editable={field.editable && this.state.editMode} />; 
            case 'checkbox': return <CheckBox type={field.type} value={field.value} editable={field.editable && this.state.editMode} />; 
            default: return undefined;
        }
    }
    
    createComponents(){
        this.state.fields = [];
        this.props.fields.forEach((field)=>{
            this.state.fields.push(this.createComponent(field));
        });
    }
    
    constructor(props){
        super(props);
    }
    
    state = {
        editMode: false,
        fields: []
    }

    getCurrentObj() {
        var obj = {};
        this.state.fields.forEach((field)=>{
            obj[field.name] = field.value;
        });
        return obj;
    }

    onChange(e) {
        this.setState({ editMode: !this.state.editMode });
        if(this.state.editMode === false){
           // Helper.post('/sign-in',this.getCurrentObj())
            //.then(res => res.json())
        }
    }

    render() {
        this.createComponents();
        return (<tr className={this.state.editMode ? "animation-toEditMode " : "record animation-green_flash"} key={this.props.key}>
        {this.state.fields.map((field,i)=>{
            return (<td key={i}>{field}</td>);
            })}
                
                <td><button className="rowButton input" onClick={this.onChange.bind(this)}>{this.state.editMode ? "Confirm": "Edit"}</button></td>        
                        
                </tr>
        
            );
        
    }
};