
## 1장. 리액트 입문

### 1-1. 리액트는 어쩌다 만들어 졌을까?
DOM을 직접 건드리면서 이벤트 핸들러, 상태값을 직접 작업하는 것은 규모가 커지면서 난잡해진다.

![난잡](https://i.imgur.com/mJftTBq.png)

그래서, AngularJS와 같은 다양한 프레임워크들이 나왔다. 이런 프레임워크들은 JS의 특정 값이 바뀌면 DOM속성이 업데이트 되도록 해서 작업을 간소화 시켜주는 방식이다.

리액트는 어떠한 상태가 바뀌었을때, 그 상태에 따라 DOM을 어떻게 업데이트 할 지 규칙을 정하는 것이 아니라, 처음부터 모든걸 새로 만들어서 보여주면 어떻까? 라는 아이디어에서 개발이 시작되었다.

![react](https://i.imgur.com/kNKIeQZ.gif)

모든걸 새로 만들게 된다면, 랜더링 속도가 굉장히 느려질 것이다. 리액트는 Virtual DOM을 사용하여 이를 가능하게 했다.
virtual DOM은 브라우저에서 보여지는 DOM이 아니라 메모리에서 가상으로 존재하는 DOM으로 JS객체이기 때문에 속도가 매우 빠르다.
리액트 개발팀에서 만든 효율적인 비교 알고리즘을 통해 REAL DOM과 비교하여 차이가 있는 곳을 감지하여 REAL DOM에 패치 시켜 준다.
![react virtual dom](https://i.imgur.com/u6YnxUS.png)

### 1-2. 작업환경 준비
- Node.js
- Yarn : npm의 개선된 버전
- VSCode
- Git 

### 1-3. 첫번째 리액트 컴포넌트
Hello.js 컴포넌트 만들기

```js
import React from 'react'

function Hello() {
    return <div>hello</div>
}

export default Hello;
```

 ![hello.js](./img/hellojs.PNG)


### 1-4. JSX의 기본 규칙 알아보기
리엑트 컴포넌트에서 XML형태로 코드를 작성하면 babel이 JSX를 JS로 변환해준다.

Babel은 JS 문법을 확장해주는 도구로, 구형 브라우저 환경에서도 최신 JS문법을 제대로 실행할 수 있도록 해준다.

JSX의 몇가지 규칙이 있다.
- 꼭 감싸져야하는 태그
두가지 이상의 태그는 무조건 하나의 태그로 감싸져있어야 한다.
```js
// 잘못된 예
function App() {
  return (
    <Hello />
    <div>안녕히계세요.</div>
  );
}
```

```js
// 정상, <> Fragment 사용
function App() {
  return (
    <> 
      <Hello />
      <div>안녕히계세요</div>
    </>
  );
}
```

- JSX안에 JS사용하기
JSX 내부에 JS 변수를 사용할 때는 {}로 감싸준다.
```js
function App(){
    const name='react';
    return (
        <>
            <Hello />
            <div> {name} </div>
        </>
    )
}
```

- style과 className

style과 ClassName을 설정하는법이 HTML과 다르다.
먼저, inline 형태로 작성해야하며, background-color와 같이 - 로 구분된 이름은 backgroundColor 처럼 camelCase 형태로 네이밍 해야한다.

css class를 설정 할 경우 class= 가 아닌 className= 으로 해주어한다.

```js
import './App.css'

function App(){
    const style = {
        backgroundColor: 'black',
        fontSize: 24
    }

    return {
        <>
            <div className="gray-box" style={style} /> 
        </>
    }
}
```

- 주석
```js
{/* */}
```

### 1-5. props를 통해 컴포넌트에게 값 전달

```js
function Hello(props){
  return <div> hi, {props.name} </div>
}
```

- 여러개의 props 비구조화 할당

```js
// App.js
...
function App(){
  <Hello name="kim" color="blue" />
}
...
```

```js
// Hello.js

function Hello({name, color}) {
  return <div style={{color: color}}> {name} </div>
}
...
```

- defaultProps 설정
```js
// Hello.js
...
Hello.defaultProps = {
  name: "이름없음"
}
...
```

- props.children
: 컴포넌트 태그안에 넣은 값을 조회하고 싶을 때, props.children으로 조회한다.(?)



### 1-6. 조건부 렌더링
- JSX에서는 null, false, undefined를 렌더링하면 아무것도 나타내지 않는다.

```js
// 3항 연산자 이용
{ isSpecial ? <b>*</b> : null }

// && 연산자 이용
{ isSpecial && <b>*</b> }

```

- props에 값을 생략하면 ={true}와 동일하다.


### 1-7. useState를 통해 컴포넌트에서 바뀌는 값 관리하기

: 지금까지는 컴포넌트에 동적인 로직이 하나도 없었다. 이번에는 컴포넌트가 사용자 액션에 따라 동적으로 바뀌어야할때 어떻게 구현하는지 알아본다.

리액트 16.8부터 도입된 Hooks를 이용하여 상태관리를 해본다.

- /src/Counter.js 생성
- 동적인 상태 관리 : useState()
- 함수형 업데이트 : 컴포넌트를 최적할 때 사용한다.
```js
// Counter.js
...
const [number, setnumber] = useState(0)
const onIncrement = () => {
  setnumber(prev => prev + 1)
}
```


### 1-8. input 상태관리하기
: 직접 구현

### 1-9. 여러개의 input상태 관리하기
: 여러개의 input 상태를 관리할때, useState를 여러번 사용하여 구현할 수도 있지만, 이는 좋은 방법이 아니다.
: input에 name 속성을 설정하고 이벤트가 발생했을 때, name 속성을 참조하는 방법이 좋다. useState에서는 문자열이 아니라 input의 상태들을 객체 형태로 관리한다.

- 리액트의 state를 수정할때는 불변성을 유지 해야한다. [immutable]
```js
...
const [inputs, setInputs] = useState({})
...
setInputs({
  ...inputs, //spread문법
  [name]: value
})
...
```

### 1-10. useRef로 특정 DOM 선택하기
: JS에서 특정 DOM을 선택할 때 getElementById()를 사용한다.
: 리액트에서 특정 DOM을 선택할 때 ref를 사용한다.
: 함수형 컴포넌트에서는 ref를 사용할 때는 useRef() Hook 함수를 사용한다.
: useRef()로 ref객체를 만든뒤, 원하는 DOM에 ref속성에 매핑해줘야 한다.



### 1-11. 배열 렌더링하기*
: JS의 map() 함수를 사용.
```js
users.map( user => <User user={user} />)
```
: 리액트에서 배열을 랜더링 할 때에는 'key'라는 props를 설정해야한다.

- key를 미설정한 경우: ![key미설정의경우](https://i.imgur.com/3rkaiY1.gif)
- key를 설정한 경우 : ![key설정한경우](https://i.imgur.com/yEUS6Bx.gif)


### 1-12. useRef로 컴포넌트 안의 변수 만들기
: useRef()는 특정 DOM element를 선택하는 용도 외에도, 컴포넌트 안에서 조회 및 수정 할 수 있는 변수를 관리할 수 있다.

- setTimeout, setInterval을 통해서 만들어진 id
- 외부 라이브러리를 사용하여 생성된 인스턴스
- scroll 위치


### 1-13. 배열에 항목 추가하기 *
: 실습

### 1-14. 배열에 항목 제거하기 *
: User 컴포넌트에 삭제button을 생성하고 삭제 기능 구현
: setusers()에서 불변성을 유지하며 users list를 수정하기위해 JS의 filter 함수를 사용했다.
```js
users.filter( user => user.id != id )
```


### 1-15. 배열에 항목 수정하기 *
: User 컴포넌트에서 계정이름을 클릭했을 때 색상이 초록색으로 바뀌고, 다시 누르면 검정색으로 바뀌도록 구현해보자.
: update를 할 때도 [immutable]한 속성을 유지하기위 map() 함수를 사용한다.

### 1-16. useEffect를 사용하여 mount/unmount/update 시 할 작업 설정하기 **
- mount : 처음 랜더링 될 때
- unmount : 사라질 때
- update : 특정 props가 바뀔 때

useEffect() Hook를 이용한다.
useEffect의 첫 인자로는 함수, 두번째 인자로는 의존값이 들어있는 배열(deps)을 넣는다.
두번째 인자(deps) 배열을 비우게 되면, 컴포넌트가 처음 mount될 때만 useEffect에 등록된 함수가 동작한다.

useEffect는 함수를 반환할 수 있다. 이를 cleanup 함수라고 한다.
deps 배열이 비어있는 경우 컴포넌트가 unmount 될 때 cleanup함수를 호출한다.

mount시에 주로하는 작업은 다음과 같다.
- props로 받은 값을 컴포넌트의 로컬 상태로 설정
- 외부 API 요청
- 라이브러리 사용
- setInterval(), setTimeout()과 같은 작업

unmoun시에 주로하는 작업은 다음과 같다.
- setInterval(), setTimeout() clear (clearInterval, clearTimeout)
- 라이브러리 인스턴스 제거

#### deps 배열에 특정 값넣기
: deps 배열에 특정 값을 넣으면, mount될 때 useEffect 함수가 호출되고 지정한 값이 바뀔 때에도 호출된다. umountt시에도 호출되고 값이 바뀌기 직전에도 호출된다.??

```js
...
useEffect( () => {
  console.log('user값이 설정됨')
  console.log(user);

  return () => {
    console.log('user가 바뀌기전..')
    console.log(user)
  }
}, [user]);
...
```
useEffect() 안에서 사용하는 state나 props가 있다면, 두 번째 인자(deps 배열)에 해당 값을 넣어주어야 한다. 이것은 규칙이다.

#### deps 파라미터를 생략하기
: deps 파라미터를 생략하면, 컴포넌트가 리랜더링 될 때마다 호출된다.



### 1-17. useMemo를 사용하여 연산한 값 재사용하기
: 성능최적화를 위해 연산된 값을 useMemo()라는 Hook을 사용하여 재사용 하는 방법을 알아본다.

이를 위해 App 컴포넌트에서 countActiveUser 함수를 만들어, complete값이 true인 사용자의 수를 세어 화면에 랜더링해보자.

: 여기서 발생하는 성능적인 이슈가 한가지 있다. input값을 바꿀때도 countActiveUser 함수가 실행된다는 것이다.

countActiveUser는 users state에 변화가 있을 때만 실행되어야하는데, 아무런 관련없는 inputs state가 변화될 때도 실행되고 있다.
이런경우에 useMemo() Hook를 사용하여 성능을 최적화 할 수 있다.

```js
import React, {useRef, useState, useMemo} from 'react'
...
const count = useMemo( () => countActiveUsers(users), [users])
...
```
: 첫번째 인자에는 연산을 정의하는 함수, 두번재 인자에는 [deps] 배열을 넣어준다. deps 배열에 넣은 state가 바뀌면, 등록한 첫번재 함수를 호출해서 값을 연산해준다.



### 1-18. useCallback을 사용하여 함수 재사용하기 ★★
: useCallback() Hook는 useMemo()와 비슷한 Hook이다.
useMemo()는 특정 결과값을 재사용 할 때 사용하는 반면, useCallback()은 특정 함수를 새로만들지 않고 재사용하고 싶을 때 사용한다.

: App.js에서 구현한 onCreate(), onDelete(), onComplete() 함수을 확인해보자.
이 함수들은 컴포넌트가 리랜더링 될 때 마다 새로 만들어진다.
함수를 새로 선언하는 것은 메모리나 cpu리소스를 많이 차지하지는 않지만 함수를 필요할때만 새로 만들고 재사용하는 것은 여전히 중요하다.
왜냐하면, 컴포넌트에서 props가 바뀌지 않으면 React의 Virtual DOM에 새로 랜더링하는 것 조차 하지 않고 컴포넌트의 결과물을 재사용하는 최적화 작업을 할 것인데, 이 때 함수 재사용이 필수적이다.

사용법은 다음과 같다.

```js
import React, {... useCallback} from 'react'
...
const onChange = useCallback( e => {
  //기존 소스코드
}, [inputs])
...
const onCreate = useCallback( () => {
  //기존 소스코드
}, [users, username, email])
```

주의할 점은 함수 안에서 사용하는 state나 props가 있다면, 꼭[deps] 배열에 해당 state나 props를 포함시켜야한다.

사실, useCallback은 useMemo를 기반으로 만들어졌다. 다만, 함수를 위해 사용할 때 더욱 편하게 해주는 것 뿐이다.

useCallback()을 적용하고 바로 최적화가 이루어지지는 않는다. 다음 강의에서 컴포넌트 최적화를 해주어야 성능최적화가 이루어진다.
그 전에, 어떤 컴포넌트가 랜더링되고 있는지 확인하기위해 'React DevTools' Chrome 확장프로그램을 설치한다.
![react-devtools](./img/react_devtools.PNG)



### 1-19. React.memo를 사용한 컴포넌트 리렌더링 방지 ★★★
컴포넌트의 props가 바뀌지 않았다면, 리랜더링을 방지하여 컴포넌트의 리랜더링 성능 최적화를 해줄 수 있는 React.memo라는 함수에 대해 알아보자.

React.memo를 사용하면 리랜더링이 필요한 상황에서만 리랜더링을 하도록 설정할 수 있다.

사용법은 다음과 같다.
```js
// CreateUser.js
...
export default React.memo(CreateUser)
```
UserList 컴포넌트와 User컴포넌트에도 동일하게 React.memo를 적용해준다.

적용하고나면 input을 수정할 때 UserList컴포넌트가 리랜더링 되지 않는 것을 확인할 수 있다.

그런데, User중 하나라도 수정하면 모든 User들이 리랜더링되고, CreateUser컴포넌트도 리랜더링 된다.
이유는 users배열이 수정될 때 마다 onCreate, onToggle, onRemove도 새로 만들어지기 때문이다.

useCallback()의 deps 배열에 users 가 들어있기 때문에 배열이 바뀔때마다 함수가 새로 만들어지는것은 당연하다.
이것을 최적화하려면 deps배열에서 users를 지우고, useState()로 관리하는 users를 참조하지 않게 바꿔야 한다.

users를 참조하지 않게 바꾸기 위해서는 '함수형 업데이트' 방식을 이용하면 된다. 함수형 업데이트를 하게 되면, setUsers()에 등록하는 콜백함수의 파라미터에서 최신 users를 참조할 수 있기 때문에 deps배열에 users를 넣지 않아도 된다. (??? 이해 안됨)

다음과 같이 각 함수들을 수정해준다.
```js
...
const onCreate = useCallback( () => {
  const user = {
    id: nextId.current,
    username,
    email
  }
  setUser( (users) => users.concat(user)); //함수형 업데이트
}, [username, email]);
```

리액트 개발자 도구의 버그인지, CreateUser 도 렌더링 되는것처럼 보이는데 실제로 console.log 찍어보시면 렌더링이 안되고 있는 것을 확인 할 수 있습니다.

리액트 개발을 하실 때, useCallback, useMemo, React.memo 는 컴포넌트의 성능을 실제로 개선할수있는 상황에서만 하세요.

예를 들어서, User 컴포넌트에 b 와 button 에 onClick 으로 설정해준 함수들은, 해당 함수들을 useCallback 으로 재사용한다고 해서 리렌더링을 막을 수 있는것은 아니므로, 굳이 그렇게 할 필요 없습니다.

추가적으로, 렌더링 최적화 하지 않을 컴포넌트에 React.memo 를 사용하는것은, 불필요한 props 비교만 하는 것이기 때문에 실제로 렌더링을 방지할수있는 상황이 있는 경우에만 사용하시길바랍니다.


### 1-20. useReducer를 사용하여 상태업로드 로직 분리하기
지금까지 만든 UserList App은 state가 App컴포넌트 내부에서 이루어져있다.
상태를 변경할 때는 useState()를 이용하였는데, useReducer()를 사용할 수 있다. useReducer() Hook를 사용하면 컴포넌트의 state 관리 로직을 컴포넌트로 부터 분리시킬 수 있다.

reducer는 현재 state와 action 객체를 파라미터로 받아 새로운 state를 반환해주는 함수이다. action객체는 state를 업데이트 하기위한 type과 data들을 가지고 있다.

```js
function reducer(state, action){
  // 새로운 state를 만드는 로직
  return nextState;
}

const [state, dispatch] = useReducer(Reducer, initialState);
// dispatch는 액션을 발생시키는 함수
// 어떤 액션을 발생시키려면 dispatch({'type': 'INCREMENT'})와 같이 사용한다.
```

먼저 Counter.js 컴포넌트에서 useReducer를 사용해보자
```js
import React, [useReducer] from 'react'

function reducer(state, action){
  switch(action.type){
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state
  }
}

const Counter() {
  const [state, dispatch] = useReducer(reducer, 0);

  const onIncrese = () => {
    dispatch({type: 'INCREMENT'})
  }

  const onDecrese = () => {
    dispatch({type: 'DECREMENT'})
  }

  return {
    <div>
      <h1>{state}</h1>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
    </div>
  }
}
```

#### App컴포넌트를 useReducer()로 구현하기
1. 먼저 App컴포넌트의 initialState를 컴포넌트 밖으로 분리하고, 내부의 state 변경 로직을 모두 제거한다.
2. reducer함수의 틀만 만들고, useReducer()를 생성한다.
3. state에서 필요한 값들을 비구조화 할당 문법으로 추출하여 각 컴포넌트에게 전달해준다.
```js
const [state, dispatch] = useReducer(reducer, initialState);
const {users} = state;
const {username, nickname} = state;
```
4. state처리 함수들(onChange, onCreate, onToggle, onRemove) 구현한다.

#### useState() VS useReducer() 무엇을 써야하나?
정해진 답은 없다. 상황에 따라 자유롭게 선택해서 사용하면 된다.
단순한 state 하나를 갖는 컴포넌트인 경우에는 useState가 적절할 것이다.
여러 state를 사용하는 컴포넌트에서는 useReducer로 관리하는 것이 편할 것이다.



### 1-21. 커스텀 Hooks 만들기
컴포넌트를 개발하다보면, 반복적인 작업이 자주 발생한다. 예를 들어 input을 관리하는 코드는 비슷한 작업이 매번 반복된다.
커스텀 Hooks를 만들어 반복되는 작업을 쉽게 재사용할 수 있다.


src/hooks 디렉토리를 만들고, 그 안에 useInput.js를 생성한다.
커스텀 Hooks를 생성할때는 보통 use~~~.js 이렇게 네이밍 한다.


커스텀 Hooks를 실제로 구현하는 것은 매우 간단하다. 함수에 원하는 로직을 구현하고 컴포넌트에서 사용하고 싶은 값들을 반환해주면 된다.

```js
// src/hooks/useInputs.js
import {useState, useCallback} from 'react';

function useInputs(initialForm){
    const [form, setForm] = useState(initialForm);

    const onChange = useCallback( (e) => {
        const {name, value} = e.target;
        setForm( form => ({...form, [name]: value}) );
    }, [])

    const reset = useCallback( ()=> setForm(initialForm), [initialForm]);
    return [form,onChange, reset]
}

export default useInputs
```

우리가 만든 커스텀 Hooks를 App.js에서 사용해보자.
useInputs Hooks를 사용하기 위해 useReudcer()에서 사용하는 inputs을 없애고 inputs과 관련된 작업을 useInputs Hooks로 대체해주어야 한다.

#### 숙제
useInputs Hooks를 useState대신 useReducer를 사용하여 구현해보시오.


### 1-22. Context API를 사용한 전역 상태값 관리
현재까지 만든 App 컴포넌트를 살펴보면, App 컴포넌트에서 onToggle, onRemove가 구현되어 있고 이 함수들은 UserList 컴포넌트를 거쳐 User컴포넌트로 전달되고 있다.


여기서 UserList 컴포넌트는 함수를 전달하기위한 중간 다리 역할만 하고 있다. 이러한 중간 다리 역할만 하는 컴포넌트는 자주 만나게 된다. 만약 중간다리 역할을 하는 컴포넌트가 3~4개 이상으로 많아진다면, 함수를 전달하는 작업은 매우 번거로울 것이다.


이럴땐 리액트의 Context API를 사용하여 프로젝트 안에서 전역적으로 "값"을 관리를 할 수 있다. "상태"가 아닌 "값" 이라고한 이유는 꼭 "상태"를 가르키지 않아도 되기 때문이다. 이 값은 함수일 수도, 외부 라이브러리의 인스턴스 이거나 DOM 객체일 수 있다.


Context API를 사용해서 새로운 Context를 만드는 방법을 알아본다.
```js
const UserDispatch = React.createContext(null)
```
React.createContext()의 인자로는 초기값을 지정할 수 있다.
Context를 만들면 Context안에 Provider라는 컴포넌트가 들어있는데, 이 Provider 컴포넌트의 value 속성을 통해 Context의 값을 정할 수 있다.
```js
<UserDispatch.Provider value={dispatch}> ... </UserDispatch.Provider>
```
이렇게 설정해주면 UserDispatch 컴포넌트 중 어디서든지 Context의 값을 바로바로 조회해서 사용할 수 있다.


이제 App컴포넌트에 Context를 만들고 사용하고 내보내는(export) 작업을 해보자.
App컴포넌트에서 만들 Context는 UserDispatch로, 어디서든지 dispatch()를 사용할 수 있도록 해준다.

```js

```
UserDispatch Context를 생성하였으면, App 컴포넌트에서 onToggle() onRemove() 함수를 지우고 UserList의 props에 전달하는 소스도 지워준다.



### 1-23. Immer를 사용한 더 쉬운 불변성 관리


### 1-24. 클래스형 컴포넌트


### 1-25. LifeCycle Method


### 1-26. componentDidCatch로 에러 잡아내기 / Sentry 연동


### 1-27. 리액트로 개발 할 때 사용하면 편리한 도구들 - Prettier, ESLint, Snippet


### 리액트 입문 마무리



