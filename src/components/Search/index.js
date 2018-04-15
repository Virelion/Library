import React, { Component } from 'react';
import Helper from './../../Helper';
import './style.css';

export default class Register extends Component {
    static propTypes = {}
    static defaultProps = {}
    state = {}

    constructor(props){
        super(props);
        this.state = {
            search: "",
            error: null,
            loaded: false,
            items: []
        }
    }

    handleChange(event){
        this.setState({loaded:true,search: event.target.value});
        fetch(Helper.getConfig().api.location+"/search/books/"+event.target.value)
                .then(res => res.json())
                .then(data => this.setState({items: data}));
    }

    render() {
        console.log("Render");
        Helper.title.set("Search");

        return (
            <div className={this.constructor.name} >
                <input type="text" name="search-field" value={this.state.search} onChange={this.handleChange.bind(this)} />
                <table>
                    <tbody>
                        <tr key="label"><th>Title</th><th>Author</th><th>Avaliable</th></tr>
                        {this.state.items.map(item => (
                            <tr key={item._id} ><td>{item.title}</td><td>{item.author}</td><td>{item.avaliable}</td></tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
};