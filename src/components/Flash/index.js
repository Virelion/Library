import React, { Component } from 'react';
import trigger from './flashtrigger';
import './style.css';

export default class Flash extends Component {
    static propTypes = {}
    static defaultProps = {}
    state = {
        fire: 0
    }
    
    constructor(props){
        super(props);
    }
    
    animate(){
        console.log("Changeing state");
        this.setState(prevState => {
            return {fire: (prevState.fire+1)%2 }
         })
    }
    
    componentDidMount(){
        trigger.subscribe(this);
    }

    render() {
        console.log(this.state.fire);
        if(this.state.fire !== 0){
            return (
                    <div className="Flash Flash-animated1" />
            );
        } else {
            return (
                    <div className="Flash Flash-animated0" />
            );
        }
    }
};