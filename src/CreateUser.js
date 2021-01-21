import React, {useContext, useRef} from 'react'
import useInputsReducer from './hooks/useInputsReducer'
import { UserDispatch } from './App'

function CreateUser(){
    const [form, onChange, reset] = useInputsReducer({
        username: '',
        email: ''
    })
    const { username, email } = form;
    const dispatch = useContext(UserDispatch);
    const nextID = useRef(4)

    const onCreate = () => {
        const user = {
            id: nextID.current,
            username,
            email,
            completed: false
        }
        dispatch({
            type:'CREATE_USER', user
        })
        nextID.current += 1;
        reset()
    }

    return(
    <div>
        <input 
            name="username"
            placeholder="계정명"
            onChange={onChange}
            value={username}
        />
        <input 
            name="email"
            placeholder="이메일"
            onChange={onChange}
            value={email}
        />
        <button onClick={onCreate}>등록</button>
    </div>
    )
}

export default React.memo(CreateUser);