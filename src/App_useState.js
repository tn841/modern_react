import React, {useRef, useState, useMemo, useCallback} from 'react'
import UserList from './UserList'
import CreateUser from './CreateUser'
import Counter from './Counter'

function countActiveUser(users) {
  console.log("countActiveUser...")
  return users.filter( user => user.completed).length
}

function App() {
  const [inputs, setinputs] = useState({
      username: '',
      email: ''
  })
  const {username, email} = inputs

  const onChange = useCallback( e => {
    const {name, value} = e.target
    setinputs( inputs => ({
      ...inputs,
      [name]: value
    })) //함수형 업데이트
  }, [])

  const [users, setusers] = useState([
    {
        id: 1,
        username: 'name1',
        email: 'email1.@mail.com',
        completed: false
    },
    {
        id: 2,
        username: 'name2',
        email: 'email2.@mail.com',
        completed: true
    },
    {
        id: 3,
        username: 'name3',
        email: 'email3.@mail.com',
        completed: false
    }
  ])

  const nextID = useRef(4)  // useRef 초기값을 4로 지정
  const onCreate = useCallback( () => {
    setusers( (users) => ([
      ...users,
      {id: nextID.current, username: username, email: email,completed: false}
    ])) //함수형 업데이트

    // setusers(users => users.concat({id: nextID.current, username: username, email: email}))

    setinputs({
      username: '',
      email: ''
    })
    nextID.current += 1;
  }, [username, email]) //함수 안에서 사용하는 state나 props가 있다면, 꼭[deps] 배열에 해당 state나 props를 포함시켜야한다.

  const onDelete = useCallback( (id) => {
    console.log(id)
    setusers( users => users.filter( user => user.id !== id))
  }, [])

  const onComplete = useCallback( (id) => {
    
    setusers( users => users.map( user => {
      console.log('onComplete setuser')
      return user.id === id ? {...user, completed: !user.completed} : user
    }
      
    ));

    // const newUsers = users.map( user => {
    //   if(id === user.id){
    //     return {...user, completed: !user.completed}
    //   } else {
    //     return user
    //   }
    // })
    // console.log(newUsers);
    // setusers(newUsers)
  }, [])

  const count = useMemo(() => countActiveUser(users), [users]);

  return (
    <div>
      <Counter />
      <CreateUser  
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList 
        users={users} 
        onDelete={onDelete}
        onComplete={onComplete}
      />
      <span>Active user : {count}</span>
    </div>
  );
}

export default App;
