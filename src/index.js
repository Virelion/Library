// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Library from './components/Library';
import App from './components/App';
import NotFound from './components/NotFound';
import AccountControll from './components/AccountControll' ;
import CustomNavLink from './components/CustomNavLink' ;
import Register from './components/Register' ;
import SignIn from './components/SignIn' ;
import './index.css';

ReactDOM.render(
<BrowserRouter>
    <div>
    <nav>
        <CustomNavLink to='/'>Home</CustomNavLink>
        <CustomNavLink to='/library'>Library</CustomNavLink>
        <AccountControll logged={false} />
    </nav>
        <div className='app_root'>
            <Switch>
                <Route path='/' exact component={App} />
                <Route path='/library' component={Library} />
                <Route path='/register' component={Register} />
                <Route path='/sign_in' component={SignIn} />
                <Route component={NotFound} />
            </Switch>
        </div>
    </div>
</BrowserRouter>,
document.getElementById('root')
);

