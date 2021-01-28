import React, {createContext, useContext, useReducer} from 'react';
import {
    createAsyncDispatcher,
    createAsyncHandler,
    initialAsyncState
} from './asyncActionUtils'
import * as api from './api'

const initialState = {
    users: initialAsyncState,
    user: initialAsyncState
}

const usersHandler = createAsyncHandler('GET_USERS', 'users')
const userHandler = createAsyncHandler('GET_USER', 'user')

function usersReducer(state, action){
    switch (action.type) {
        case 'GET_USERS':
        case 'GET_USERS_SUCCESS':
        case 'GET_USERS_ERROR':
          return usersHandler(state, action);
        case 'GET_USER':
        case 'GET_USER_SUCCESS':
        case 'GET_USER_ERROR':
          return userHandler(state, action);
        default:
          throw new Error(`Unhanded action type: ${action.type}`);
      }
}

const UserStateContext = createContext(null);
const UserDispatchContext = createContext(null);

function UserContext({children}) {
    const [state, dispatch] = useReducer(usersReducer, initialState)

    return (
        <UserStateContext.Provider value={state}>
            <UserDispatchContext.Provider value={dispatch}>
                {children}
            </UserDispatchContext.Provider>
        </UserStateContext.Provider>
    )
}

export default UserContext;

export function useUsersState(){
    const state = useContext(UserStateContext);
    if(!state){
        throw new Error('Cannot find UsersContext')
    }
    return state
}

export function useUsersDispatch(){
    const dispatch = useContext(UserDispatchContext)
    if(!dispatch){
        throw new Error('Cannot find UsersContext')
    }
    return dispatch
}

export const getUsers = createAsyncDispatcher('GET_USERS', api.getUsers)
export const getUser = createAsyncDispatcher('GET_USER', api.getUser)