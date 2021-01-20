import React, {useReducer} from 'react'
import UserList from './UserList'
import CreateUser from './CreateUser'

const initialState = [
    {
        id: 1,
        username: 'name1',
        email: 'email1.@mail.com',
        completed: false
    },
    {
        id: 2,
        username: 'name2',
        email: 'email2.@mail.com',
        completed: true
    },
    {
        id: 3,
        username: 'name3',
        email: 'email3.@mail.com',
        completed: false
    }
  ]

function countActiveUser(users){
    return users.filter( user => user.completed).length;
}

function App(){
    return (
        <div>
            <CreateUser />
            <UserList 
                users={[]} 
            />
            <span>Active user : {0}</span>
        </div>
    )
}

export default App;