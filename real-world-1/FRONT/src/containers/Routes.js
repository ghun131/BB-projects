import React from 'react';
import { Route } from 'react-router-dom';
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
            <Route path="/tag/:tagName" component={Home}/>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/settings" component={Setting} />
            <Route exact path="/editor" component={CreateEditArticle} />
            <Route path="/editor/:id" component={CreateEditArticle} />
            <Route path="/article/:id" component={Article} />

            <Route path="/profile/:username" component={Profile} />
        </div>
    )
}

export default routePath;