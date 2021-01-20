import React, {useCallback, useMemo, useReducer, useRef} from 'react'
import UserList from './UserList'
import CreateUser from './CreateUser'

const initialState = {
    inputs: {
        username: '',
        email: '',
    },
    users: [
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
}

function reducer(state, action){
    // onChange, onCreate, onToggle, onRemove의 state 변경 로직 구현
    switch(action.type) {
        case 'CHANGE_INPUT':
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.name]: action.value
                }
            }
        case 'CREATE_USER':
            return {
                ...state,
                users: [
                    ...state.users,
                    action.user
                ]
            }
        case 'TOGGLE_USER':
            return {
                ...state,
                users: state.users.map( user => 
                    user.id === action.id ? {...user, completed: !user.completed} : user)
            }
        case 'REMOVE_USER':
            return {
                ...state,
                users: state.users.filter( user => user.id !== action.id)
            }
        default:
            return state
    }
}

function countActiveUser(users){
    return users.filter( user => user.completed).length;
}

function App(){
    const [state, dispatch] = useReducer(reducer, initialState);
    const {users} = state;
    const {username, email} = state.inputs 

    const onChange = useCallback( (e) => {
        const {name, value} = e.target
        dispatch({
            type: 'CHANGE_INPUT',
            name,
            value
        }) 
    }, [])

    const nextUserId = useRef(4)
    const onCreate = useCallback( () => {
        const user = {
            id: nextUserId.current,
            username,
            email,
            completed: false
        }
        dispatch({type: 'CREATE_USER', user})
        nextUserId.current += 1;
    }, [username, email])

    const onToggle = useCallback( id => {
        dispatch({type: 'TOGGLE_USER', id})
    }, [])

    const onRemove = useCallback( id => {
        dispatch({type: 'REMOVE_USER', id})
    }, [])

    const userCount = useMemo( ()=> countActiveUser(users), [users])

    return (
        <div>
            <CreateUser 
                username={username} 
                email={email}
                onChange={onChange}
                onCreate={onCreate}
            />
            <UserList 
                users={users}
                onComplete={onToggle}
                onDelete={onRemove}
            />
            <span>Active user : {userCount}</span>
        </div>
    )
}

export default App;