import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../components/Home';
import Login from '../components/Login';
import Register from '../components/Register';
import Setting from '../components/Setting';
import CreateEditArticle from '../components/CreateEditArticle';
import Profile from '../components/Profile';
import Article from '../components/Article';

const routePath = (props) => {
    return (
        <div>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/settings" component={Setting} />
            <Route path="/editor/" component={CreateEditArticle} />
            <Route path="/article/" component={Article} />
            

            <Route path="/profile" component={Profile} />
        </div>
    )
}

export default routePath;