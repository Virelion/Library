import React, { Component } from 'react';
import InputField from './InputField';
import Select from './Select';
import CheckBox from './CheckBox';
import Helper from './../../Helper';
import './style.css';

export default class EditableRow extends Component {
    static propTypes = {}
    static defaultProps = {}
    
    createComponent(field,i){
        switch(field.type){
            case 'select': return <Select onRef={ref => this.registerRef(ref,i)} className="rowItem" fieldName={field.name} model={field.model} value={field.value} editable={field.editable && this.state.editMode} />;
            case 'text': return <InputField onRef={ref => this.registerRef(ref,i)} className="rowItem" fieldName={field.name} value={field.value} editable={field.editable && this.state.editMode} />; 
            case 'checkbox': return <CheckBox onRef={ref => this.registerRef(ref,i)} fieldName={field.name} value={field.value} editable={field.editable && this.state.editMode} />; 
            case 'hidden': this.myRefs.push({ getCurrentField: ()=>{ return {name: field.name, value: field.value} } }); return null; 
            default: return undefined;
        }
    }
    
    registerRef(ref,i){
        this.myRefs.push(ref);
    }
    
    createComponents(){
        var newFields = [];
        this.props.fields.forEach((field,i)=>{
            newFields.push(this.createComponent(field,i));
        });
        this.fields= newFields;
    }
    
    constructor(props){
        super(props);
        this.myRefs = [];
    }
    
    state = {
        editMode: false,
        fields: [],
        success: false,
        failure: false
    }

    getCurrentObj() {
        var obj = { 
            setSuccess: ()=>this.setSuccess(),
            setFailure: ()=>this.setFailure()
        };
        this.myRefs.forEach((ref)=>{
            var fieldVal = ref.getCurrentField();
            obj[fieldVal.name] = fieldVal.value;
        });
        return obj;
    }

    onChange(e) {
        this.setState({ editMode: !this.state.editMode },()=>{
            if(this.state.editMode === false){
               this.props.onConfirm(this.getCurrentObj());
            }
        });
    }
    
    setSuccess(){
        this.setState({success:true, failure: false});
    }
    
    setFailure(){
        this.setState({success:false, failure: true});
    }
    
    getUIclass(){
        var classString = "record";
        if(this.state.editMode){
            classString+=" animation-toEditMode";
        }
        if(this.state.success){
            classString+=" animation-green_flash";
        }
        else if(this.state.failure){
            classString+=" animation-red_flash";
        }
        return classString;
    }

    render() {
        this.createComponents();
        return (<tr className={this.getUIclass()}>
        {this.fields.map((field,i)=>{
                if(field){
                    return (<td key={i}>{field}</td>);
                }
            })}
                
                <td><button className="rowButton input" onClick={this.onChange.bind(this)}>{this.state.editMode ? "Confirm": "Edit"}</button></td>        
                        
                </tr>
        
            );
        
    }
};