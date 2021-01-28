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



## 4-2. useReducer로 요청 상태 관리하기
useState대신 useReducer로 API 상태관리를 구현해본다.
'LOADING', 'SUCCESS', 'ERROR'

```js
import React, { useEffect, useReducer } from 'react'
import axios from 'axios'

const initialState = {
    loading: false,
    error: null,
    users: null
}

function reducer(state, action) {
    switch(action.type){
        case 'LOADING':
            return {
                users: null,
                loading: true,
                error: null
            }
        case 'SUCCESS':
            return {
                users: action.users,
                loading: false,
                error: null
            }
        case 'ERROR':
            return {
                users: null,
                loading: false,
                error: action.error
            }
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

function Users(){
    const [state, dispatch] = useReducer(reducer, initialState);
    
    const fetchUsers = async () => {
        try{
            dispatch({type:'LOADING'})
            const res = await axios.get(
                'https://jsonplaceholder.typicode.com/users'
                );
            dispatch({type:'SUCCESS', users: res.data})
            
        } catch (e) {
            dispatch({type:'ERROR', error:e})
        }
    };

    useEffect(()=>{
        fetchUsers();
    }, []);

    const {loading, error, users} = state;

    if(loading) return <div>로딩중...</div>;
    if(error) return <div>에러 발생</div>;
    if(!users) return <div>user없음</div>;

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
```

## 4-3. useAsync 커스텀 Hook 만들어 사용하기
API 통신을 할 때 마다 리듀서를 작성하는 것은 번거롭다. 매번 반복되는 'LOADING', 'SUCCESS', 'ERROR' 코드를 커스텀 Hook로 만들어서 요청 상태 관리 로직을 쉽게 재사용가능하도록 구현한다.

 ```js
 import { useReducer, useEffect } from 'react';

function reducer(state, action) {
    switch (action.type) {
      case 'LOADING':
        return {
          loading: true,
          data: null,
          error: null
        };
      case 'SUCCESS':
        return {
          loading: false,
          data: action.data,
          error: null
        };
      case 'ERROR':
        return {
          loading: false,
          data: null,
          error: action.error
        };
      default:
        throw new Error(`Unhandled action type: ${action.type}`);
    }
  }

  function useAsync(callback, deps = []) {
    const [state, dispatch] = useReducer(reducer, {
        loading: false,
        data: null,
        error: false
      });

      const fetchData = async () => {
        dispatch({ type: 'LOADING' });
        try {
          const data = await callback();
          dispatch({ type: 'SUCCESS', data });
        } catch (e) {
          dispatch({ type: 'ERROR', error: e });
        }
      };

      useEffect(() => {
        fetchData();
        // eslint 설정을 다음 줄에서만 비활성화
        // eslint-disable-next-line
      }, deps);

      return [state, fetchData];
  }

  export default useAsync;
 ```

 useAsync 함수는 두가지 파라미터를 받는다. 
 1. API요청을 시작하는 콜백 함수
 2. useEffect의 deps

deps 값은 나중에 사용할 비동기 함수에서 파라미터가 필요하고, 그 파라미터가 바뀔 때 새로운 데이터를 불러오고 싶은 경우에 활용한다. default 값은 []이다, 즉 컴포넌트가 처음 랜더링 할 때만 API를 호출하고 싶다는 의미이다.

useAsync Hook 함수의 리턴값은 [state, fetchData]이다. fetchData함수를 사용하여 API 요청을 쉽게 처리할 수 있다.


### 데이터 나중에 불러오기
User 컴포넌트는 처음 랜더링 되는 시점부터 API를 요청하고 있다. 특정 버튼을 눌렀을 때만 API요청을 하도록 구현해보자.

useAsync 세번째 파라미터로 skip을 추가한다.
```js
 function useAsync(callback, deps = [], skip=false) {
     ...
     useEffect(() => {
          if (skip) return;
          fetchData();    
    }
    ...
 }
```


### API 호출 시 파라미터가 필요한 경우
User 한명의 상세정보를 보여주는 User 컴포넌트를 만들고, prop로 id를 넘겨 https://jsonplaceholder.typicode.com/users/1 와 같이 파라미터를 추가하여 API요청을 보낸다.

```js
import React from 'react';
import axios from 'axios';
import useAsync from './useAsync';

async function getUser(id) {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );
  return response.data;
}

function User({ id }) {
  const [state] = useAsync(() => getUser(id), [id]);
  const { loading, data: user, error } = state;

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!user) return null;

  return (
    <div>
      <h2>{user.username}</h2>
      <p>
        <b>Email:</b> {user.email}
      </p>
    </div>
  );
}

export default User;
```

id 가 바뀔 때 마다 재호출 되도록 deps 에 id 를 넣어준다.

![](../img/api04.gif)


## 4-4. react-async로 API 상태 관리하기
[react-async](https://github.com/ghengeveld/react-async)는 지난 4-3에서 만들었던 useAsync와 비슷한 함수가 들어있는 라이브러리 이다.

이 라이브러리에서 제공하는 함수의 이름도 useAsync인데, 사용법이 조금 다르다.

매번 커스텀 Hook를 만들기 귀찮다면 react-async를 사용하면 된다. 우리가 만들었던 useAsync는 배열로 반환하는 반면, react-async의 useAsync는 객체 형태로 결과를 반환한다.

우선 react-async 라이브러리를 설치한다.
```bash
npm install react-async
```

react-async의 공식 라이브러리에서 제공하는 사용법을 확인해보자.
```js
import { useAsync } from "react-async"

const loadCustomer = async ({ customerId }, { signal }) => {
  const res = await fetch(`/api/customers/${customerId}`, { signal })
  if (!res.ok) throw new Error(res)
  return res.json()
}

const MyComponent = () => {
  const { data, error, isLoading } = useAsync({ 
      promiseFn: loadCustomer, 
      customerId: 1 
    })
  if (isLoading) return "Loading..."
  if (error) return `Something went wrong: ${error.message}`
  if (data)
    return (
      <div>
        <strong>Loaded some data:</strong>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    )
  return null
}
```


### User 컴포넌트 전환
User 컴포넌트를 react-async의 useAsync로 변환해보자.

```js
// User.js
const { data: user, error, isLoading } = useAsync({
        promiseFn: getUser,
        id,
        watch: id
    });
```

```js
// Users.js
const {data: users, isLoading, error, run, reload} = useAsync({
        // promiseFn: fetchUsers
        deferFn: fetchUsers
    })
```

이전 섹션에서 배웠던 skip 처럼, 렌더링하는 시점이 아닌 사용자의 특정 인터랙션에 따라 API 를 호출하고 싶을 땐 promiseFn 대신 deferFn 을 사용하고, reload 대신 run 함수를 사용하면 된다.

### 정리
react-async 라이브러리는 정말 쓸만하고, 편합니다. 다만, 우리가 이전에 직접 만들었던 useAsync 와 크게 다를 건 없죠. 어떤 측면에서는 우리가 직접 만든 Hook 이 편하기도 합니다. 예를 들어서 Hook 의 옵션이 굉장히 간단하죠. 그리고, watch 같은 것 대신에 deps 를 사용하기도 하고, 반환 값이 배열 형태이기 때문에 (리액트 자체 내장 Hook 과 사용성이 비슷하다는 측면에서) 더욱 Hook 스럽습니다.

반면에 react-async 의 useAsync 는 옵션이 다양하고 (promiseFn, deferFn, watch, ...) 결과 값도 객체 안에 다양한 값이 들어있어서 (run, reload, ...) 헷갈릴 수 있는 단점이 있긴 하지만 다양한 기능이 이미 내장되어있고 (예를 들어서 요청을 [취소](https://github.com/ghengeveld/react-async#cancel) 할 수도 있습니다.) Hook 을 직접 만들 필요 없이 바로 불러와서 사용 할 수 있는 측면에서는 정말 편합니다.

만약 우리가 직접 만들었던 useAsync 의 작동 방식을 완벽히 이해하셨다면 여러분의 필요에 따라 커스터마이징 해가면서 사용 할 수 있으니까 직접 만들어서 사용하는 것을 추천드립니다. 특히나, 연습용 프로젝트가 아니라, 오랫동안 유지보수 할 수도 있게 되는 프로젝트라면 더더욱 추천합니다.

반면, 작은 프로젝트이거나, 직접 만든 useAsync 의 작동 방식이 조금 어렵게 느껴지신다면 라이브러리로 설치해서 사용하는것도 좋습니다.

## 4-5. Context와 함께 사용하기
리액트의 Context와 API연동을 함께처리하는 방법에 대해서 알아본다. 앱 전체에서 사용되는 로그인 정보, 설정 정보는 API로 데이터를 가져온 뒤 Context로 관리한다.

### Context 준비하기
- UsersContext.js 파일 생성
  - createContext, useReducer, useContext 사용
  - initialState 정의
  - reducer 함수 정의
  - UserStateContext 생성, UserDispatchContext 생성
  - UsersProvider 컴포넌트 정의
    - props로 {children} 받아 return 하기
    - useReducer로 [state, dispatch] 생성
    - <Context.Provider value={}>로 context 값 넘겨주기
  - state와 dispatch context값을 쉽게 사용할 수 있도록 커스텀 Hook 정의 및 export
    - export function useUsersState()
    - export function useUsersDispatch()


### API 처리 비동기 함수 만들기
위에서 준비된 UsersContext.js context 소스코드에 API처리 함수를 추가해준다. Context와는 독립적인 로직이며, Context의 dispatch를 사용하여 API의 응답값을 state에 넣어주는 API 처리함수 (getUsers, getUser)를 만든다.
- axios 라이브러리 추가
- getUsers 비동기 함수 정의
```js
export async function getUsers(dispatch){
  dispatch({type:'GET_USERS'})
  try{
    const res = await axios.get('https://jsonplaceholder.typicode.com/users')
    dispatch({type:'GET_USERS_SUCCESS', data:res.data})
  } catch (e) {
    dispatch({type:'GET_USERS_ERROR', error:e})
  }
}
```
- getUser 함수 정의
```js
export async function getUser(dispatch, id){
  dispatch({ type: 'GET_USER' });
  try {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    dispatch({ type: 'GET_USER_SUCCESS', data: response.data });
  } catch (e) {
    dispatch({ type: 'GET_USER_ERROR', error: e });
  }
}
```

getUsers()와 getUser() 함수 구조를 보면 중복되는 코드들이 있다. 이것들은 나중에 리팩토링해줄 예정이다.


### Context 사용하기
- AppUsers컴포넌트를 UsersProvider(Context)컴포넌트로 감싸준다.
- Users컴포넌트에서 Context 값, 함수들을 사용한다.
- User컴포넌트에서도 Context 값, 함수들을 사용한다.


### 반복되는 코드를 줄이자.
위에서 구현한 코드는 Context + 비동기API 연동의 정석이다. 이 패턴을 잘 이해하고 활용하길 바란다. 나아가 반복되는 로직을 함수화 하여 리팩토링하는 작업을 진행한다.

가장먼저 실제 API요청을 보내는 getUsers()와 getUser()함수의 axios로직(비동기 로직)만 api.js 파일로 분리해준다.
```js
// api.js

import axios from 'axios';

export async function getUsers() {
  const response = await axios.get(
    'https://jsonplaceholder.typicode.com/users'
  );
  return response.data;
}

export async function getUser(id) {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );
  return response.data;
}
```

그리고 asyncActionUtils.js 라는 파일을 만든다.
```js
// asyncActionUtils.js

export default function createAsyncDispatcher(type, promisFn) {
  // 이 함수는 파라미터로 action.type과 Promise를 만들어주는 함수를 받아온다.
  const SUCCESS = `${type}_SUCCESS`;
  const ERROR = `${type}_ERROR`

  async function actionHandler(dispatch, ...rest) {
    dispatch({type});
    try{
      const data = await promiseFn(...rest);
      dispatch({
        type: SUCCESS,
        data
      })
    } catch (e) {
      dispatch({
        type: ERROR,
        error: e
      })
    }
  }

  return actionHandler;
}
```

이제 UsersContext 코드를 다음과 같이 리팩토링할 수 있다.
```js
import React, { createContext, useReducer, useContext } from 'react';
import createAsyncDispatcher from './createAsyncDispatcher';
import * as api from './api'; // api 파일에서 내보낸 모든 함수들을 불러옴

(...)

export const getUsers = createAsyncDispatcher('GET_USERS', api.getUsers);
export const getUser = createAsyncDispatcher('GET_USER', api.getUser);
```


나아가 UserContext의 리듀서 코드도 asyncActionUtils.js에 리팩토링할 수 있다.

```js
// asyncActionUtils.js
...
export const initialAsyncState = {
  loading: false,
  data: null,
  error: null
};

// 로딩중일 때 바뀔 상태 객체
const loadingState = {
  loading: true,
  data: null,
  error: null
};

// 성공했을 때의 상태 만들어주는 함수
const success = data => ({
  loading: false,
  data,
  error: null
});

// 실패했을 때의 상태 만들어주는 함수
const error = error => ({
  loading: false,
  data: null,
  error: error
});

// 세가지 액션을 처리하는 리듀서를 만들어줍니다
// type 은 액션 타입, key 는 리듀서서 사용할 필드 이름입니다 (예: user, users)
export function createAsyncHandler(type, key) {
  // 성공, 실패에 대한 액션 타입 문자열을 준비합니다.
  const SUCCESS = `${type}_SUCCESS`;
  const ERROR = `${type}_ERROR`;

  // 함수를 새로 만들어서
  function handler(state, action) {
    switch (action.type) {
      case type:
        return {
          ...state,
          [key]: loadingState
        };
      case SUCCESS:
        return {
          ...state,
          [key]: success(action.data)
        };
      case ERROR:
        return {
          ...state,
          [key]: error(action.error)
        };
      default:
        return state;
    }
  }

  // 반환합니다
  return handler;
}
```


반복되는 코드가 많이 사라졌지요? 꼭 이렇게 까지 리팩토링을 할 필요가 없지만, 이런 코드가 맘에 든다면, 자주 사용되는 코드를 함수화해서 재사용하시면 좋습니다.


## 4-6. API 연동 정리
이번 4장에서는 리액트에서 API를 연동하는 방법에 대해서 알아보았다.
컴포넌트 내부에서 Hooks를 사용하는것 부터 해서 Context와 함께 사용하는 방법, 마지막으로 유틸함수를 만들어 코드를 간결하게 리팩토링 하는 작업까지 해보았다.

리액트에서 API를 연동할 때는 Redux나 MobX와 같은 상태관리 라이브러리를 함께 사용하기도 한다. 해당 라이브러리를 사용할 경우 좀 더 체계적으로 비동기 관련 처리를 할 수 있고, redux-saga, redux-observable 같은 미들웨어 라이브러리를 사용하여 복잡한 비동기 작업을 좀 더 편하게 처리할 수 있다.

나중에 [서버사이드랜더링](https://asfirstalways.tistory.com/244)을 구현할 때, 서버에서 들고 있는 데이터를 쉽게 보존하여 그대로 브라우저에 전달하게 되는 과정이 훨씬 더 쉬워지기도 한다.

Redux/MobX에 대해서는 나중에 자세히 알아볼 예정이다.