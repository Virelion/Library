import React, { Component } from 'react';
import './style.css';

export default class MessageBox extends Component {
    static propTypes = {}
    static defaultProps = {}
    state = {}

    render() {
        console.log(this.props.message);
        if(this.props.message){
            return (
                <div className={this.constructor.name+" MessageBox-"+this.props.message.success} >
                    {this.props.message.content?this.props.message.content:null}
                </div>
            );
        }
        return(null);
    }
};