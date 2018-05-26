import React, { Component } from 'react';
import InputField from './InputField';
import Select from './Select';
import PasswordField from './PasswordField';
import DateInput from './DateInput';
import CheckBox from './CheckBox';
import './style.css';

export default class EditableRow extends Component {
    static propTypes = {}
    static defaultProps = {}
    
    createComponent(field,i){
        switch(field.type){
            case 'select': return <Select onRef={ref => this.registerRef(ref,field.name)} className="rowItem" fieldName={field.name} model={field.model} value={field.value} editable={field.editable && this.state.editMode} />;
            case 'text': return <InputField placeholder={field.placeholder} onRef={ref => this.registerRef(ref,field.name)} className="rowItem" fieldName={field.name} value={field.value} editable={field.editable && this.state.editMode} />; 
            case 'password': return <PasswordField onRef={ref => this.registerRef(ref,field.name)} className="rowItem" fieldName={field.name} value={field.value} editable={field.editable && this.state.editMode} />; 
            case 'checkbox': return <CheckBox onRef={ref => this.registerRef(ref,field.name)} fieldName={field.name} value={field.value} editable={field.editable && this.state.editMode} />; 
            case 'date': return  <DateInput onRef={ref => this.registerRef(ref,field.name)} className="rowItem" fieldName={field.name} value={field.value} editable={field.editable && this.state.editMode} />; 
            case 'hidden': this.myRefs[field.name] = { 
                                getCurrentField: ()=>{ return {name: field.name, value: field.value} } ,
                                setState: ()=>{}
                            }; 
                return null; 
            default: return undefined;
        }
    }
    
    registerRef(ref,name){
        this.myRefs[name] = ref;
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
        this.myRefs = {};
    }
    
    componentDidMount(){
    }
    
    state = {
        editMode: false,
        fields: [],
        success: false,
        failure: false,
        prev: null
    }

    getCurrentObj() {
        var obj = { 
            setSuccess: ()=>this.setSuccess(),
            setFailure: ()=>this.setFailure(),
            add: this.props.addMode
        };
        var that = this;
        Object.keys(this.myRefs).forEach(function(key) {
            var fieldVal = that.myRefs[key].getCurrentField();
            obj[fieldVal.name] = fieldVal.value;
        });
        return obj;
    }

    onChange(e) {
        this.setState((prevState)=>{
            
            return { editMode: !prevState.editMode, prevState: this.getCurrentObj()};
        },()=>{
            if(this.state.editMode === false){
                this.props.onConfirm(this.getCurrentObj());
            } else {
               this.setState({prev:this.getCurrentObj()});
            }
        });
    }
    
    cancel(){
        var myRefs = this.myRefs;
        var prev = this.state.prev;
        if(prev){
            Object.keys(prev).forEach((key)=>{
                if( myRefs[key]){
                    myRefs[key].setState({value: prev[key]});
                }
            });
        }
        
        this.setState((prevState)=>{
            return { editMode: !prevState.editMode}
        });
    }
    
    delete(){
        this.props.onDelete(this.getCurrentObj()._id);
    }
    
    setSuccess(){
        this.setState({success:true, failure: false});
    }
    
    setFailure(){
        this.setState({success:false, failure: true});
    }

    render() {
        this.createComponents();
        if(this.props.addMode && !this.state.editMode){
            return (<tr><td><button  className="rowButton input" onClick={this.onChange.bind(this)} >Add</button>
            </td></tr>);
        } else {
            return (
                    <tr className={this.state.editMode?"editMode":""}>
                    {
                        this.fields.map(
                            (field,i)=>{
                                if(field){
                                    return (<td key={i}>{field}</td>);
                                } else {
                                    return (null);
                                }
                            }
                        )
                    }

                  <td><button className="rowButton input" onClick={this.onChange.bind(this)} >{this.state.editMode ? "Confirm": "Edit"}</button>
                  {this.state.editMode?<br />:null}
                  {this.state.editMode?<button  className="rowButton input" onClick={this.cancel.bind(this)} >Cancel</button>:null}  
                  </td>
                  <td>
                  {this.props.onDelete?<button className="rowButton input" onClick={this.delete.bind(this)} >Delete</button>:null}
                  </td>
                  </tr>
              );  
        }
        
        
    }
};