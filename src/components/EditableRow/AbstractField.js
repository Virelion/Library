import React, { Component } from 'react';

export default class AbstractField extends Component {    
    
    /**
     * Field validation is as:
     * this.props.validation = {
     *     required: true/false;
     *     rules: [
     *         { check: (element)=>{somerule}, message: "Should be something if rule.check is not met" }
     *     ]
     * }
     */
    isFieldValid(){
        var validateObj = {valid: true, messages: []};
        if(!this.props.validation){
            return validateObj;
        } else {
            if(this.props.validation.required && this.state.value === ""){
                validateObj.valid = false;
                validateObj.messages.push("Required field cannot be empty");
            }
            this.props.validation.rules.forEach( (rule) => {
                console.log("tim");
                if(!rule.check(this)){
                    validateObj.valid = false;
                    validateObj.messages.push("Field "+this.props.fieldName+": "+rule.message);
                }
            });
            return validateObj;
        }
    }
    
    getRequiredIndicator(){
        if(this.props.validation && this.props.validation.required && this.props.editable){
            return <span className="requiredMark">*</span>;
        } else {
            return (null);
        }
    }
    
    renderField(){
        throw new Error("Must implement this method in subclass");
    }
    
    getCurrentField(){
        return { name: this.props.fieldName, value: this.state.value };
    }
    
    componentDidMount(){
        this.props.onRef(this);
    }
    
    render(){
        return <span>{this.renderField()}{this.getRequiredIndicator()}</span>
    }
}