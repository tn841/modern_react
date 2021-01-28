import React from 'react'
import { Route, Link } from 'react-router-dom'
import Home from './Home'
import About from './About'

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
        </>
    )
}

export default AppRouter