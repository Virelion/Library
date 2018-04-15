import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Library from './components/Library';
import Home from './components/Home';
import NotFound from './components/NotFound';
import AccountControll from './components/AccountControll' ;
import CustomNavLink from './components/CustomNavLink' ;
import Register from './components/Register' ;
import SignIn from './components/SignIn' ;
import ManageAccount from './components/ManageAccount' ;
import App from './components/App' ;
import './index.css';

ReactDOM.render(
        <App />,
document.getElementById('root')
);

