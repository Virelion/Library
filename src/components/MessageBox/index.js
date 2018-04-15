import React, { Component } from 'react';
import './style.css';

export default class MessageBox extends Component {
    static propTypes = {}
    static defaultProps = {}
    state = {}

    render() {
        if(this.props.message){
            return (
                <div className={this.constructor.name+" "+this.props.type} >
                    {this.props.message}
                </div>
            );
        }
        return(null);
    }
};