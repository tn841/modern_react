import React, {createContext, useContext, useReducer} from 'react';
import axios from 'axios'

const initialState = {
    users: {
        loading: false,
        data: null,
        error: null
    },
    user: {
        loading: false,
        data: null,
        error: null
    }
};

function userReducer(state, action) {
    switch(action.type) {
        case 'GET_USERS':{
            // console.log('get_users.. loading')
            return {
                ...state,
                users:{
                    loading: true,
                    data: null,
                    error: null
                }
            }
        }
        case 'GET_USERS_SUCCESS':{
            // console.log(action.data)
            return {
                ...state,
                users:{
                    loading: false,
                    data: action.data,
                    error: null
                }
            }
        }
        case 'GET_USERS_ERROR': {
            return {
                ...state,
                users:{
                    loading: false,
                    data: null,
                    error: action.error
                }
            }
        }
        case 'GET_USER' : {
            return {
                ...state,
                user:{
                    loading: true,
                    data: null,
                    error: null
                }
            }
        }
        case 'GET_USER_SUCCESS':{
            return {
                ...state,
                user:{
                    loading: false,
                    data: action.data,
                    error: null
                }
            }
        }
        case 'GET_USER_ERROR': {
            return {
                ...state,
                user:{
                    loading: false,
                    data: null,
                    error: action.error
                }
            }
        }
        default :{
            throw new Error(`unhanded action type: ${action.type}`)
        }
        
    }
}

const UserStateContext = createContext(null);
const UserDispatchContext = createContext(null);

function UserContext({children}) {
    const [state, dispatch] = useReducer(userReducer, initialState)

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


//////////// API 요청 보내는 비동기 함수 /////////////
export async function getUsers(dispatch) {
    dispatch({type:'GET_USERS'})
    try{
        const res = await axios.get('https://jsonplaceholder.typicode.com/users')
        dispatch({type:'GET_USERS_SUCCESS', data: res.data})
    } catch (e) {
        dispatch({type:'GET_USERS_ERROR', error:e})
    }
}

export async function getUser(dispatch, id){
    dispatch({type:'GET_USER'})
    try{
        const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
        dispatch({type:'GET_USER_SUCCESS', data: res.data})
    } catch (e) {
        dispatch({type:'GET_USER_ERROR', error:e})
    }
}