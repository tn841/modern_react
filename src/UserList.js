import React from 'react'

function User({user, onDelete}){
    return (
        <div>
            <b>{user.username}</b> <span>({user.email})</span>
            <button onClick={ () => onDelete(user.id)}>삭제</button>
        </div>
    )
};

function UserList({users, onDelete}){

    return (
        <div>
            {users.map( user => (
                <User user={user} key={user.id} onDelete={onDelete} />
            ))}
        </div>
    )
}

export default UserList;