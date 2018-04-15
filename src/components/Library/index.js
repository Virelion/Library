import React, { Component } from 'react';
import './style.css';
import Helper from './../../Helper';
import Search from '../Search';

export default class Library extends Component {
    static propTypes = {}
    static defaultProps = {}
    state = {}

    render() {
        Helper.title.set("Library");
        return (
            <div className={this.constructor.name} >
                <h1>
                    Search for your book
                </h1>
                <Search />
            </div>
        );
    }
};