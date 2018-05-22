import React, { Component } from 'react';
import Helper from './../../Helper';

export default class Management extends Component{
    send(url,data){
        Helper.postWithToken(url,{data: data})
            .then(res => res.json())
            .then(data => {
                    this.setState({message:data.message});
                    this.refresh();
                }
            );
    }
    
    constructor(props){
        super(props);
    }   
    
    componentDidMount(){
        this.refresh();
    }
    
    refresh(){
        throw new Error("Implement this");
    }
}

