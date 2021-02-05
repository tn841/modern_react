## 9장. 더 배우기 
> 개인적으로 학습이 필요한 내용을 정리한ㄴ다.

- redux toolkit : https://redux-toolkit.js.org/
- TypeScript
- react 인증 구현 : https://www.daleseo.com/react-router-authentication/


### 9-1. Redux Toolkit
리덕스 툴킷은 redux 모듈을 작성하는 정형화된 방법을 제공한다. 순수한 redux를 사용하기위해서는 몇가지 단점들이 있었다.
1. Redux Store를 configure하기가 복잡하다.
2. Redux를 유용하게 사용하기 위해서는 많은 패키지를 추가해야한다.
3. Redux에는 너무 많은 boilerplate code가 필요하다.

위 단점들을 해결하기 위해 Redux Toolkit이 나왔다.


#### Redux Tookit이 제공하는 API
- configureStore()
- createSlice()
- createAsyncThunk()
- createEntitiyAdapter()
- createSelector()


#### 설치
```bash
npm install @reduxjs/toolkit
```

#### configureStore

#### createSlice


#### createAsyncThunk
action type과 promise 객체를 리턴하는 callback 함수(payloadCreator)를 인자받는 함수이다. 
createAsyncThunk는 표준 Redux thunk action creator를 반환한다. 
```js
/*
- GET_POST action.type을 첫번재 인자로 받는다.
- 두번째 인자는 payloadCreator 콜백 함수로 반드시 Promise 객체를 반환해야한다.
*/
const getPosts = createAsyncThunk(GET_POSTS, async (id, thunkAPI) => {
    const res = await thunkAPI.???(id);
    return res  // Promise 객체를 리턴해야한다.
})

const postsSlice = createSlice({
    name: 'posts',
    initialState: {posts=null, loading: false, error: null},
    reducers : {/* 표준 리듀서 로직 */},
    extraRuducers: {
        [getPost.pending] : (state, action) => { 
            state.loading= true;
            state.posts= null;
            state.error= null;
        }
        [getPost.fulfilled] : (state, action)  => { 
            state.loading = false;
            state.posts = action.payload;
            state.error= null
        },
        [getPost.rejected]: (state, action) => {
            state.loading = false;
            state.posts = null
            state.error = action.paylod
        }
    }
})
```
createAsyncThunk는 인자로 전달한 action type(GET_POSTS)을 기반으로 Promise lifecycle action type을 생성하고, thunk action creator를 반환한다. thunk action creator는 promiseFn callback을 실행하고 promise의 결과 따라 action을 dispatch한다.

위의 일련의 과정은 비동기 API 요청 상태를 관리하는데 추천되는 표준이다.

createAsyncThunk는 파라미터 3개를 받을 수 있다. (action.type, payloadCreator, option)

- action.type : Promise lifeCycle에 기반한 action.type 문자열이다.
    - pending 
    - fulfilled
    - rejected
- payloadCreator : Promise 객체를 반환하는 콜백함수이다. payloadCreator 함수는 두개의 파라미터를 받는다. 
    - arg : 단일 값으로, id 파라미터를 전달하는데 쓰인다. 여러 값을 전달하고 싶다면 object 형태로 전달하면 된다.
    - thunkAPI : redux thunk 함수로 전달하는 모든 파라미터를 갖고있는 객체이다.
        - dispatch : redux store의 dispatch
        - getState : redux store의 getState
        - extra : thunk 미들웨어 생성시 설정했던 extra 인자
        - requestId : request sequence를 식별하기위해 자동으로 생성된 문자열 ID
        - signal : [AbortController.signal](https://developer.mozilla.org/en-US/docs/Web/API/AbortController/signal)객체이다. 요청 중간에 취소 요청시 사용
        - rejectWithValue : 어떤 값을 제공하든 전달하고 rejected acition의 페이로드를 반환합니다.
- options :
    - condition : 
    - dispatchConditionRejection : 


다시 createAsyncThunk 함수로 돌아와서, createAsyncThunk 함수가 반환하는 값에 대해 알아보자. createAsyncThunk는 표준 redux thunk action creator를 반환한다. thunk action creator는 pending, fulfilled, reject에 대한 순수 action creator이다.

createAsyncThunk는 4가지(?) 함수를 생성한다. 
- getPosts : 순수 thunk action creator이다. 
    - getPosts.pending : 'posts/getPosts.pending' action을 생성하는 action creator
    - getPosts.fulfilled : 'posts/getPost.fulfilled'
    - getPosts.rejected : 'post/getPost.rejected'

getPosts가 dispatch되면, thunk는 다음과 같이 동작한다.
- getPosts.pending action을 dispatch한다.
- payloadCreator 콜백 함수를 호출하고 promise 객체가 반환될때까지 대기한다.
- promise가 반환되면,
    - promise가 성공적으로 resolve되었다면, action.payload 값과 함께 fulfilled action을 dispatch한다.
    - promise가 rejectWithValue(value) 으로 resolve되었다면, action.error.message와 action.payload값을 전달하며 rejected action을 dispatch한다.
    - promise가 rejectWithValue로 처리되지않고 실패했다면, action.error값을 전달하며 rejected action을 dispatch한다.
- promise 반환값에 따른 최종 action을 dispatch한다.

#### /src/modules/posts.js
- createSlice, createAsyncThunk 로 posts 모듈을 구현해본다.