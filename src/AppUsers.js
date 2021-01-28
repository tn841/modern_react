import React from 'react'
import Users from './Users'
import UserContext from './UsersContext'

function AppUsers(){
    return (
        <UserContext>
            <Users />
        </UserContext>
    )
}

export default AppUsers;