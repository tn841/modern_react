import React, { useState } from 'react'
// import useAsync from './useAsync'
// import { useAsync } from 'react-async'
import User from './User'
import {useUsersState, useUsersDispatch, getUsers} from './UsersContext'



function Users(){
    // const {data: users, isLoading, error, run, reload} = useAsync({
    //     // promiseFn: fetchUsers
    //     deferFn: fetchUsers
    // })
    const state = useUsersState()
    const dispatch = useUsersDispatch()
    const [userid, setUserid] = useState(null);

    const {loading, data: users, error} = state.users;

    const fetchUsers = async () => {
        getUsers(dispatch)
    }

    if(loading) return <div>로딩중...</div>;
    if(error) return <div>에러 발생</div>;
    if(!users) return <button onClick={fetchUsers}>데이터 불러오기</button>;

    return (
        <>
            <ul>
                {users.map( user => (
                    <li 
                        key={user.id}
                        onClick={ () => {
                            setUserid(user.id)
                        }}
                        style={{ cursor: 'pointer'}}
                    >
                        {user.username} ({user.name})
                    </li>
                ))}
            </ul>
            <button onClick={fetchUsers}>다시 불러오기</button>
            <hr/>
            {userid && <User id={userid} />}
        </>
    )
}

export default Users