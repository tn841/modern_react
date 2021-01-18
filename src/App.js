import React, {useRef, useState} from 'react'
import UserList from './UserList'
import CreateUser from './CreateUser'

function App() {
  const [inputs, setinputs] = useState({
      username: '',
      email: ''
  })
  const {username, email} = inputs

  const onChange = e => {
    const {name, value} = e.target
    setinputs({
      ...inputs,
      [name]: value
    })
  }

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
  const onCreate = () => {
    setusers([
      ...users,
      {id: nextID.current, username: username, email: email,completed: false}
    ])

    // setusers(users.concat({id: nextID.current, username: username, email: email}))

    setinputs({
      username: '',
      email: ''
    })
    nextID.current += 1;
  }

  const onDelete = (id) => {
    console.log(id)
    setusers(users.filter( user => user.id !== id))
  }

  const onComplete = (id) => {
    setusers(users.map( user => 
      user.id === id ? {...user, completed: !user.completed} : user
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
  }
  return (
    <div>
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
    </div>
  );
}

export default App;
