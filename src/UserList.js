import React, { useEffect } from 'react'

const User = React.memo( function User({user, onDelete, onComplete}){
    useEffect( () => {
        // console.log('user값이 설정됨')
        // console.log(user);
      
        return () => {
        //   console.log('user가 바뀌기전..')
        //   console.log(user)
        }
      }, [user]);
    return (
        <div>
            <b 
                style={{
                    color: user.completed ? 'green' : 'black',
                    cursor: 'pointer'
                }} 
                onClick={() => onComplete(user.id)}
            >
                    {user.username}
            </b>
            &nbsp;
            <span>({user.email})</span>
            <button onClick={ () => onDelete(user.id)}>삭제</button>
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
                    onDelete={onDelete} 
                    onComplete={onComplete}
                />
            ))}
        </div>
    )
}

export default React.memo(UserList);