import React from 'react'

function User({user, onDelete, onComplete}){
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
};

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

export default UserList;