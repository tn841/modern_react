import React from 'react'
import { Route, Link } from 'react-router-dom'
import Home from './Home'
import About from './About'
import Profile from './Profile'

function AppRouter(){
    return (
        <>
        <ul>
            <li>
                <Link to="/">홈</Link>
            </li>
            <li>
                <Link to="/about">소개</Link>
            </li>
            
        </ul>
            <Route path="/" exact={true} component={Home} />
            <Route path="/about" component={About} />
            <Route path="/profile/:username" component={Profile} />
        </>
    )
}

export default AppRouter