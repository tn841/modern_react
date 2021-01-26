import React, { useEffect, useReducer } from 'react'
import axios from 'axios'

const initialState = {
    loading: false,
    error: null,
    users: null
}

function reducer(state, action) {
    switch(action.type){
        case 'LOADING':
            return {
                users: null,
                loading: true,
                error: null
            }
        case 'SUCCESS':
            return {
                users: action.users,
                loading: false,
                error: null
            }
        case 'ERROR':
            return {
                users: null,
                loading: false,
                error: action.error
            }
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

function Users(){
    const [state, dispatch] = useReducer(reducer, initialState);
    
    const fetchUsers = async () => {
        try{
            dispatch({type:'LOADING'})
            const res = await axios.get(
                'https://jsonplaceholder.typicode.com/users'
                );
            dispatch({type:'SUCCESS', users: res.data})
            
        } catch (e) {
            dispatch({type:'ERROR', error:e})
        }
    };

    useEffect(()=>{
        fetchUsers();
    }, []);

    const {loading, error, users} = state;

    if(loading) return <div>로딩중...</div>;
    if(error) return <div>에러 발생</div>;
    if(!users) return <div>user없음</div>;

    return (
        <>
            <ul>
                {users.map( user => (
                    <li key={user.id}>
                        {user.username} ({user.name})
                    </li>
                ))}
            </ul>
            <button onClick={fetchUsers}>다시 불러오기</button>
        </>
    )
}

export default Users