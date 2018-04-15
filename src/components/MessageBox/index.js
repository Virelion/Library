import React, { Component } from 'react';
import './style.css';

export default class MessageBox extends Component {
    static propTypes = {}
    static defaultProps = {}
    state = {}

    render() {
        if(this.props.message){
            return (
                <div className={this.constructor.name+" MessageBox-"+this.props.message.success} >
                    {this.props.message.content}
                </div>
            );
        }
        return(null);
    }
};