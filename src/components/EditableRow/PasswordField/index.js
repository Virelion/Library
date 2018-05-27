import React from 'react';
import AbstractField from './../AbstractField';
import Helper from './../../../Helper';
import './style.css';

export default class PasswordField extends AbstractField {
    static propTypes = {}
    
    state = {
        value: '',
        repeat: '',
        model: '',
    }

    onValueChange(e) {
        this.setState({value: e.target.value});
    //    this.validate();
    }
    
    onRepeatChange(e){
        this.setState({repeat: e.target.value});
      //  this.validate();
    }
    
    validatePasswords(){
        var valid = Helper.password.rule(this.state.value,this.state.repeat);
        valid = valid || (this.state.value.length === 0 && this.state.repeat.length === 0);
        return valid;
    }

    renderField() {
        if(!this.props.editable){
            return (<input className="input" placeholder="Password" type='password' value="" disabled />);
        } else {
            return (<div className="password">
                        <input className="input" placeholder="Password" type='password' value={this.state.value} onChange={this.onValueChange.bind(this)} />
                        <input className="input" placeholder="Repeat password" type='password' value={this.state.repeat} onChange={this.onRepeatChange.bind(this)} />
                    </div>
                        );
        }
    }
};