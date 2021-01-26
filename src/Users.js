import React, { useEffect, useReducer, useState } from 'react'
import axios from 'axios'
import useAsync from './useAsync'
import User from './User'

function Users(){
    const [state, fetchData] = useAsync( async ()=>{
        const res = await axios('https://jsonplaceholder.typicode.com/users')
        return res.data
    }, [], true)
    const [userid, setUserid] = useState(null);

    const {loading, error, data: users} = state;

    if(loading) return <div>로딩중...</div>;
    if(error) return <div>에러 발생</div>;
    if(!users) return <button onClick={fetchData}>데이터 불러오기</button>;

    return (
        <>
            <ul>
                {users.map( user => (
                    <li 
                        key={user.id}
                        onClick={ () => setUserid(user.id)}
                        style={{ cursor: 'pointer'}}
                    >
                        {user.username} ({user.name})
                    </li>
                ))}
            </ul>
            <button onClick={fetchData}>다시 불러오기</button>
            <hr/>
            {userid && <User id={userid} />}
        </>
    )
}

export default Users