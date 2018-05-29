import React, { Component } from 'react';
import './style.css';
import Helper from './../../Helper';
import Search from '../Search';

export default class Retrospective extends Component {
    static propTypes = {}
    static defaultProps = {}
    state = {
        items: false
    }
    
    componentDidMount(){
        this.refresh();
    }
    
    refresh(){
        
    }

    render() {
        //Helper.title.set("Library");
        return (
            <div className={this.constructor.name} >
                <h1>
                    Search for your book
                </h1>
            </div>
        );
    }
};