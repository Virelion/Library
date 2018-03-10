// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, NavLink, Route, Switch } from 'react-router-dom';
import About from './components/About';
import App from './components/App';
import NotFound from './components/NotFound';
import AccountControll from './components/AccountControll' ;
import CustomNavLink from './components/CustomNavLink' ;
import './index.css';

ReactDOM.render(
<BrowserRouter>
    <div>
    <nav>
        <CustomNavLink to='/'>Home</CustomNavLink>
        <CustomNavLink to='/about'>About</CustomNavLink>
        <AccountControll logged={false} />
    </nav>
        <Switch>
            <Route path='/' exact component={App} />
            <Route path='/about' component={About} />
            <Route component={NotFound} />
        </Switch>
    </div>
</BrowserRouter>,
document.getElementById('root')
);

