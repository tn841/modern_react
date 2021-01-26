import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Users(){
    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)

    const fetchUsers = async () => {
        try{
            setUsers(null);
            setError(null);
            setLoading(true);

            const res = await axios.get('https://jsonplaceholder.typicode.com/users');

            setUsers(res.data)
        } catch (e) {
            setError(e)
        }
        setLoading(false);
    };

    useEffect(()=>{
        fetchUsers();
    }, []);

    if(loading) return <div>로딩중...</div>;
    if(error) return <div>에러 발생</div>;
    if(!users) return null;
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