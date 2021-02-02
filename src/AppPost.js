import React from 'react'
import { Route } from 'react-router-dom';
import PostListPage from './pages/PostListPage'
import PostPage from './pages/PostPage'

const AppPost = () => (
        <div style={{margin: "10px"}}>
            <Route path='/' exact={true} component={PostListPage} />
            <Route path='/:id' component={PostPage} />
        </div>
    );
export default AppPost