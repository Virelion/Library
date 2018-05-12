import { Component } from 'react';

export default class AbstractField extends Component {
    getCurrentField(){
        return { name: this.props.fieldName, value: this.state.value };
    }
    
    componentDidMount(){
        this.props.onRef(this);
        console.log("ref");
    }
}