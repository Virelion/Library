import React, { Component } from 'react';
import Helper from './../../Helper';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Library from './../Library';
import Home from './../Home';
import NotFound from './../NotFound';
import AccountControll from './../AccountControll' ;
import CustomNavLink from './../CustomNavLink' ;
import Register from './../Register' ;
import SignIn from './../SignIn' ;
import ManageAccount from './../ManageAccount' ;
import Session from './../../Session';
import './style.css';

export default class App extends Component {
    static propTypes = {}
    static defaultProps = {}
    state = {}
    
    componentDidMount(){
        this.refresh();
        Session.setOnSessionItemChange((tag,item)=>{
            console.log("AccountControll callback");
            if(tag === Session.user){
                console.log("AccountControll callback: set state");
                this.refresh();
            }
        })
    }
    
    refresh(){
        this.setState({logged: Session.getSessionItem(Session.user)});
    }

    render() {
        Helper.title.reset();
        if(!this.state.logged){
            return (
                <SignIn />
            );
        } else {
            return (
                <BrowserRouter>
                    <div>
                    <nav>
                        <CustomNavLink to='/'>Home</CustomNavLink>
                        <CustomNavLink to='/library'>Library</CustomNavLink>
                        <AccountControll />
                    </nav>
                        <div className='app_root'>
                            <Switch>
                                <Route path='/' exact component={Home} />
                                <Route path='/library' component={Library} />
                                <Route path='/register' component={Register} />
                                <Route path='/account' component={ManageAccount} />
                                <Route component={NotFound} />
                            </Switch>
                        </div>
                    </div>
                </BrowserRouter>
            );
        }
    }
};
