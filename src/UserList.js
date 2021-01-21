import React, { useEffect, useContext } from 'react'
import { UserDispatch } from './App'

const User = React.memo( function User({user}){
    useEffect( () => {
        // console.log('user값이 설정됨')
        // console.log(user);
      
        return () => {
        //   console.log('user가 바뀌기전..')
        //   console.log(user)
        }
    }, [user]);

    const dispatch = useContext(UserDispatch);

    return (
        <div>
            <b 
                style={{
                    color: user.completed ? 'green' : 'black',
                    cursor: 'pointer'
                }} 
                onClick={() => {
                    dispatch({type: 'TOGGLE_USER', id: user.id});
                }}
            >
                    {user.username}
            </b>
            &nbsp;
            <span>({user.email})</span>
            <button onClick={ () => {
                dispatch({type: 'REMOVE_USER', id: user.id})
            }}>
                삭제
            </button>
        </div>
    )
});

function UserList({users, onDelete, onComplete}){

    return (
        <div>
            {users.map( user => (
                <User 
                    user={user} 
                    key={user.id} 
                />
            ))}
        </div>
    )
}

export default React.memo(UserList);