# 7장. 리덕스 미들웨어
리덕스 미들웨어는 리덕스가 지니고 있는 핵심 기능이다. Context API 또는 MobX를 사용하는 것과 차별화 되는 부분다.


![](https://i.imgur.com/31tvphE.png)

리덕스 미들웨어를 사용하면 액션이 dispatch된 다음, 리듀서에서 해당 action을 받아와서 새로운 state를 반환하기 전에 추가적인 작업을 할 수 있따.

- 특정 조건에 따라 액션이 무시되게 만들 수 있다
- 액션을 콘솔에 출력하거나, 서버쪽에 로깅을 할 수 있다.
- 액션이 디스패치 됐을 때 이를 수정해서 리듀서에게 전달되도록 할 수 있다.
- 특정 액션이 발생했을 때 이에 기반하여 다른 액션이 발생되도록 할 수 있다.
- 특정 액션이 발생했을 때 특정 자바스크립트 함수를 실행시킬 수 있다.


보통 리덕스 미들웨어를 사용하는 주된 용도는 비동기 작업을 처리하기 위해서다.

리덕스 미들웨어는 커스텀하여 사용할 수 있지만, 일반적으로는 리덕스 미들웨어 라이브러리를 설치하여 사용한다. 비동기 작업에 관련된 미들웨어 라이브러리는 
- [redux-thunk](https://github.com/reduxjs/redux-thunk)
- [redux-saga](https://github.com/redux-saga/redux-saga)
- [redux-observable](https://redux-observable.js.org/)
- [redux-promise-middleware](https://www.npmjs.com/package/redux-promise-middleware)

등이 있다.

redux-saga와 redux-observable은 특정 action을 모니터링 할 수 있어, 특정 액션이 dispatch됐을 때, 원하는 함수를 호출하거나, router를 통해 다른 주소로 이동하는 것이 가능하다.

이 강의에서는 가장 많이 사용되는 redux-thunk와 redux-saga를 다룬다.

먼저 간단한 미들웨어를 직접 만들어보면서 미들웨어가 어떻게 작동하는지 알아본다. 그 다음 [redux-logger](https://www.npmjs.com/package/redux-logger)라이브러리를 사용하여 미들웨어를 적용하는 방법을 알아보고, redux-thunk와 redux-saga를 사용하여 비동기 작업을 효율적으로 처리하는 방법을 배워본다.


## 7-1. 리덕스 프로젝트 준비하기

- CRA로 새로운 프로젝트 준비 (생략)
- redux와 react-redux 라이브러리 설치

연습 프로젝트로 Counter App을 만들어본다.

### 리덕스 모듈 준비
Ducks 패턴으로 리덕스 모듈을 작성한다.
- modules 디렉토리 생성
- action 객체, action creator, initialStae, reducer 정의
- rootReducer 생성

> 기존 counter.js module 재사용

### react App에 리덕스 적용
- index.js에 Provider로 App 감싸기

### 프리젠테이셔널 컴포넌트 준비
- /src/components/Counter.js
- {number, onIncrease, onDecrease}를 props롤 받는다.

### 컨테이너 컴포넌트 준비
- /src/todoContainer/CounterContainerWithMiddleware.js
- App.js에 랜더링 하기


## 7-2. 미들웨어 만들어보고 이해하기
미들웨어를 직접 만들어보자.

### 리덕스 미들웨어의 템플릿
리덕스 미들웨어를 만들 땐 다음 템플릿을 사용한다.
```js
const middleware = store => next => action => {
    // something..
}
```

미들웨어는 결국 하나의 함수이다. 함수를 연달아 두번 리턴하는 함수이다.
화살표 함수대신 function 키워드로 생성하면 다음과 같다.
```js
function middleware(store){
    return function (next){
        return function (action) {
            // something
        }
    }
}
```

미들웨어 함수 내부의 각 파라미터들이 어떤 의미인지 알아본다.

첫번째 store는 redux store의 인스턴스 이다. dispatch, getState, subscribe 등의 내장 함수들을 갖고 있다.

두번째 next는 action을 다음 미들웨어에게 전달하는 함수이다. next(action) 형태로 사용하게 된다. **만약 다음 미들웨어가 없다면 reducer에게 action을 전달해준다.**

세번째 action은 현재 처리하고 있는 액션 객체이다.

![](https://i.imgur.com/fZs5yvY.png)

미들웨어는 위와 같은 구조로 동작한다.

리덕스 스토어를 생성할 때 여러개의 미들웨어를 등록할 수 있다. 새로운 액션이 dispatch되면 가장 먼저 등록한 미들웨어가 호출된다. 첫번째 미들웨어에서 next(action)을 호출하면 다음 미들웨어로 action이 넘어간다. 미들웨어에서 store.dispatch()로 다른 action을 추가적으로 발생시킬 수 도 있다.

### 미들웨어 직접 작성해보기
/src/middlewares 라는 디렉토리를 만들고 myLogger.js라는 파일을 작성한다.

```js
// /src/middlewars/myLogger.js

const myLogger = store => next => action => {
    console.log(action);
    const result = next(action);
    return result
}

export default myLogger
```

### redux에 미들웨어 적용하기
redux에 미들웨어를 적용하기 위해서는 redux store를 생성하는 index.js 파일에 ```applyMiddleware```라는 함수를 사용하여 미들웨어를 적용한다.

```js
import {createStore, applyMiddleware} from 'redux'

const store = createStore(rootReducer, applyMiddleware(myLogger))
```

![gif 추가 : console에 myLogger 동작하는 gif]()


### 미들웨어 수정하기
action이 리듀서까지 전달되고 나서 새로운 state가 반환된 결과를 확인하고 싶은경우 다음과 같이 수정하면 된다.

```js
const myLogger = store => next => action => {
    console.log(action);
    const result = next(action);
    console.log('\t', store.getState())
    return result
```

이렇듯 미들웨어 안에서는 어떤 작업이라도 할 수 있다. 예를 들어 액션 객체를 객체가 아닌 함수로 받아오게 만들어서 ```typeof action === 'function'``` 인경우 해당 액션 함수를 실행하도록 할 수 있다 
> 이게 우리가 배울 redux-thunk 이다.

```js
const thunk = store => next => action => (
    typeof action === 'function'
        ? action(store.dispatch, store.getState())
        : next(action)
)
```

thunk 미들웨어는 다음과 같이 사용할 수 있다.

```js
const myThunk = () => (dispatch, getState) => {
    dispatch({type: 'HELLO'})
    dispatch({type: 'BYE'})
}

dispatch(myThunk())
```

