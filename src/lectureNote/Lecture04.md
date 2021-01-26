## 4장. API연동하기
실제 웹 어플리케이션에서는 서버와 API통신을 통해 데이터를 주고 받게된다. 주로 [Redux](https://redux.js.org/)라는 라이브러리와 Redux Middleware를 함께 사용하여 구현하는 경우가 많다. 

API를 연동함에 있어서 Redux가 필수적인 요소는 아니다. 이번 장에서는 Redux없이 API연동을 하는 방법을 알아보고, 깔끔한 코드로 구현하는 방법에 대해 배워본다.

이번 장을 진행하기 위해 JavaScript의 비동기 처리에 대한 기본적인 개념을 숙지하고 있어야한다. Promise와 anyce/await에 대해 잘 모른다면, [밸로퍼트 모던 JS](https://learnjs.vlpt.us/async/)를 통해 개념을 공부한 뒤 진행한다.

## 4-1. API 연동의 기본
API를 호출하기 위해서 [axios](https://github.com/axios/axios)라는 라이브러리를 설치한다.

axios를 사용해서 HTTP 메서드로 API요청을 할 수 있다.
- GET : 데이터 조회
- POST : 데이터 등록
- PUT : 데이터 수정
- DELETE : 데이터 삭제
기타 PATCH, HEAD 등등의 HTTP 메서드들이 있다.

axios의 사용법은 다음과 같다.
```js
import axios from 'axios'

axios.get('/user/1');  
axios.post('/users', {
    username: 'name1',
    age: 20
})
```

API 연동 실습에는 [JSONPlaceholder](https://jsonplaceholder.typicode.com/)에 있는 연습용 API를 사용할 것이다.

- url : https://jsonplaceholder.typicode.com/users
```json
[
  {
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",
    "address": {
      "street": "Kulas Light",
      "suite": "Apt. 556",
      "city": "Gwenborough",
      "zipcode": "92998-3874",
      "geo": {
        "lat": "-37.3159",
        "lng": "81.1496"
      }
    },
    ...
  }
```

### useState와 useEffect로 데이터 로딩하기
useState로 요청상태를 관리하고, useEffect로 컴포넌트 랜더링 시점에 요청을 보내는 작업을 해본다.

requset state를 관리할 때는 다음 3가지 state를 관리해야한다.
1. reqeust 결과
2. 로딩 상태
3. 에러

src 디렉토리에 Users.js를 생성하고 다음 코드를 작성한다.

```js
import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Users(){
    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)

    useEffect(()=>{
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
        fetchUsers();
    }, []);

    if(loading) return <div>로딩중...</div>;
    if(error) return <div>에러 발생</div>;
    if(!users) return null;
    return (
        <ul>
            {users.map( user => (
                <li key={user.id}>
                    {user.username} ({user.name})
                </li>
            ))}
        </ul>
    )
}

export default Users
```

![](../img/api01.gif)

### 에러발생 확인하기
요청 URL을 이상하게 바꾸어 에러를 발생시켜보자.

![](../img/api02.gif)


### 버튼을 눌러 API 재요청하기
fetchUser 함수를 useEffect Hook 밖으로 꺼내주고, 버튼에 연결해준다.
![](../img/api03.gif)

