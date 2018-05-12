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
        valid: true
    }

    onValueChange(e) {
        this.setState({value: e.target.value});
        this.validate();
    }
    
    onRepeatChange(e){
        this.setState({repeat: e.target.value});
        this.validate();
    }
    
    validate(){
        this.setState((prevState)=>{
            var valid = Helper.password.rule(prevState.value,prevState.repeat);
            valid = valid || (prevState.value.length === 0 && prevState.repeat.length === 0);
            return {valid: valid};
        });
    }

    render() {
        if(!this.props.editable){
            return (<input className="input" placeholder="Password" type='password' value="" disabled />);
        } else {
            return (<div className="password">
                        <input className={this.state.valid? "input":"input invalid"} placeholder="Password" type='password' value={this.state.value} onChange={this.onValueChange.bind(this)} />
                        <input className={this.state.valid? "input":"input invalid"} placeholder="Repeat password" type='password' value={this.state.repeat} onChange={this.onRepeatChange.bind(this)} />
                    </div>
                        );
        }
    }
};