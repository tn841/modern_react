import React from 'react'
import {NavLink, Route} from 'react-router-dom'
import Profile from './Profile'
import WithRouterSample from './WithRouterSample'
import WithRouterHookSample from './WithRouterHookSample'

function Profiles(){
    return (
        <div>
            <h3>유저 목록:</h3>
            <ul>
                <li>
                    <NavLink 
                        to="/profiles/sumin"
                        activeStyle={{background:'green', color:'white'}}
                    >sumin</NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/profiles/gildong"
                        activeStyle={{background:'green', color:'white'}}
                    >gildong</NavLink>
                </li>
            </ul>

            <Route
                path="/profiles"
                exact
                render={() => <div>유저를 선택해주세요.</div>}
            />
            <Route path="/profiles/:username" component={Profile} />
            <WithRouterSample />
            <WithRouterHookSample />
        </div>
    )
}

export default Profiles;