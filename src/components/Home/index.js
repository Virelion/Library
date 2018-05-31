import React, { Component } from 'react';
import Helper from './../../Helper';
import './style.css';

export default class App extends Component {
    static propTypes = {}
    static defaultProps = {}
    state = {}

    render() {
        Helper.title.reset();
        return (
            <div className={this.constructor.name} >
                <img alt="logo" id="article-logo" src="logo.png" />
                
                <h1>ScrumBox</h1>
                <div className="right-side">
                    <p>
                        React app which is helping in preparing retrospectives.
                    </p>
                    <p>
                        Here you can:
                    </p>
                        <ul>
                            <li>create space for your team</li>
                            <li>prepare retrospective</li>
                            <li>vote for issues</li>
                        </ul>
                </div>
            </div>
        );
    }
};
