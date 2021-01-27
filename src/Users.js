import React, { useEffect, useReducer, useState } from 'react'
import axios from 'axios'
// import useAsync from './useAsync'
import { useAsync } from 'react-async'
import User from './User'

const fetchUsers = async () => {
    const res = await axios('https://jsonplaceholder.typicode.com/users')
    return res.data
}

function Users(){
    const {data: users, isLoading, error, run, reload} = useAsync({
        // promiseFn: fetchUsers
        deferFn: fetchUsers
    })
    const [userid, setUserid] = useState(null);


    if(isLoading) return <div>로딩중...</div>;
    if(error) return <div>에러 발생</div>;
    if(!users) return <button onClick={run}>데이터 불러오기</button>;

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
            <button onClick={run}>다시 불러오기</button>
            <hr/>
            {userid && <User id={userid} />}
        </>
    )
}

export default Users