import React, { Component } from 'react';
import Helper from './../../Helper';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import TeamManagement from './../Management/TeamManagement';
import UserManagement from './../Management/UserManagement';
import Retrospectives from './../Management/Retrospectives' ;
import Home from './../Home';
import NotFound from './../NotFound';
import AccountControll from './../AccountControll' ;
import CustomNavLink from './../CustomNavLink' ;
import Register from './../Register' ;
import Flash from './../Flash' ;
import SignIn from './../SignIn' ;
import ManageAccount from './../ManageAccount' ;
import Retrospective from './../Management/Retrospective' ;
import Session from './../../Session';
import './style.css';

export default class App extends Component {
    static propTypes = {}
    static defaultProps = {}
    state = {}
    
    componentDidMount(){
        this.refresh();
        Session.setOnSessionItemChange((tag,item)=>{
            if(tag === Session.user){
                this.refresh();
            }
        })
    }
    
    refresh(){
        this.setState({logged: Session.getSessionItem(Session.user)});
    }

    render() {
        var isAdmin = Session.isAdmin();
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
                        {isAdmin?<CustomNavLink to='/teams'>Teams</CustomNavLink>:null}
                        {isAdmin?<CustomNavLink to='/users'>Users</CustomNavLink>:null}
                        <CustomNavLink to='/retrospectives'>Retrospectives</CustomNavLink>
                        <AccountControll />
                    </nav>
                        <Flash />
                        <div className='app_root'>
                            <Switch>
                                <Route path='/' exact component={Home} />
                                <Route path='/teams' component={TeamManagement} />
                                <Route path='/users' component={UserManagement} />
                                <Route path='/retrospectives' component={Retrospectives} />
                                <Route path='/retrospective/:id' component={Retrospective} />
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
