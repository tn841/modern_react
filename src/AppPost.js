import React from 'react'
import { Route } from 'react-router-dom';
import PostListPage from './pages/PostListPage'
import PostPage from './pages/PostPage'
import CounterContainer from './todoContainers/CounterContainerWithMiddleware'

const AppPost = () => (
        <div style={{margin: "10px"}}>
            <CounterContainer />
            <Route path='/' exact={true} component={PostListPage} />
            <Route path='/:id' component={PostPage} />
        </div>
    );
export default AppPost