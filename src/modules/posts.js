import * as postsAPI from '../api/posts'
import { 
    createPromiseThunk, 
    reducerUtils, 
    handleAsyncActions,
    createPromiseThunkById,
    handleAsyncActionsById,
    createPromiseSaga,
    createPromiseSagaById
} from '../lib/asyncUtils'
import { getContext, takeEvery } from 'redux-saga/effects'
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

////////////////////////////////////////////////////////

export const getPosts = createAsyncThunk(
    'posts/GET_POSTS',
    async (value, thunkAPI) => {
        return await postsAPI.getPosts()
    }
)

export const getPost = createAsyncThunk(
    'posts/GET_POST',
    async (value, thunkAPI) => {
        return await postsAPI.getPostById(value)
    }
)

const postsSlice = createSlice({
    name:'posts',
    initialState: {
        posts:reducerUtils.initial(),
        post:{}
    },
    reducers : {
      
    },
    extraReducers : {
        [getPosts.pending] : (state, action) => {
            console.log(state.posts.data)
            if(!state.posts.data){
                state.posts.loading = true;
                state.posts.data = null;
                state.posts.error = null
            } else {
                state.posts.loading = false;
            }
            
        },
        [getPosts.fulfilled] : (state, action) => {            
            state.posts.data = action.payload
            state.posts.loading = false
            state.posts.error = null
        },
        [getPosts.rejected] : (state, action) => {
            state.posts.data = null
            state.posts.loading = false
            state.posts.error = action.payload
        },


        [getPost.pending] : (state, action) => {
            const postId = action.meta.arg;
            if(!state.post[postId]){
                console.log('getPost pending first')
                state.post[postId] = {}

                state.post[postId].loading = true;
                state.post[postId].data = null;
                state.post[postId].error = null;
            } else {
                console.log('getPost pending after')
                state.post[postId].loading = false;
            }
            
        },
        [getPost.fulfilled] : (state, action) => {
            const postId = action.meta.arg;
            if(!state.post[postId]){
                state.post[postId] = {}
            }
            state.post[postId].loading = false;
            state.post[postId].data = action.payload;
            state.post[postId].error = null;
        },
        [getPost.rejected] : (state, action) => {
            const postId = action.meta.arg;
            if(!state.post[postId]){
                state.post[postId] = {}
            }
            state.post[postId].loading = false;
            state.post[postId].data = null;
            state.post[postId].error = action.payload;
        }
    }
})

// export const { GET_POSTS, GET_POST } = postsSlice.actions
export const postsRTKReducer = postsSlice.reducer




////////////////////////////////////////////////////////

// 1. action type 정의
// const GET_POSTS = 'GET_POSTS'
// const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS'
// const GET_POSTS_ERROR = 'GET_POSTS_ERROR'

// const GET_POST = 'GET_POST'
// const GET_POST_SUCCESS = 'GET_POST_SUCCESS'
// const GET_POST_ERROR = 'GET_POST_ERROR'

// const CLEAR_POST = 'CLEAR_POST'
const GO_TO_HOME = 'GO_TO_HOME'


// 2. action creator 함수 정의
// thunk를 사용할 때는 thunk함수에서 바로 action 객체를 생성해도 된다.
/*
thunk 이해하기,,
원래 이 단계는 redux module에는 action객체를 반환하는 
action creator를 정의하는 단계이다.

그러나, API 연동을 위해서는 비동기 처리가 필요하고 이를 위해 redux-thunk를
사용한다. 이 때, redux-thunk 미들웨어는 action값을 객체 대신 함수를 
넘길 수 있게 해주는 라이브러리이다. dispatch(thunk()) 이렇게 함수를 넘길 수
있게 된다. 따라서, 이 단계에서는  action creator대신 thunk()함수를 정의할것이다.
thunk()함수란, 인자로 (dispatch, getState)를 받는 함수를 일컫는다.


+++ redux-saga 미들웨어를 사용할경우
: action객체를 반환하는 평범한 action creator를 정의한다.
: 순수 action객체를 반환하는 제너레이터 함수(사가함수)를 정의한다. 여기서 비동기 작업들을 진행한다.
: 사가함수를 특정 action과 매핑? 하며 rootSaga에 등록하기 위해 합쳐준다.

 */
// export const getPosts = createPromiseThunk(GET_POSTS, postsAPI.getPosts)
// export const getPost = createPromiseThunkById(GET_POST, postsAPI.getPostById)
// export const clearPost = () => ({type:CLEAR_POST})

// export const getPosts = () => ({type: GET_POSTS})
// export const getPost = id => ({type: GET_POST, payload: id, meta: id}) //payload는 파라미터 용도, meta는 리듀서에서 id를 알기 위해

// const getPostsSaga = createPromiseSaga(GET_POSTS, postsAPI.getPosts);
// const getPostSaga = createPromiseSagaById(GET_POST, postsAPI.getPostById);

// function* getPostsSaga() {
//     try{
//         // console.log('getPostsSaga','before API call')
//         const posts = yield call(postsAPI.getPosts);
//         // redux-saga의 call 함수는 특정함수를 호출하고 결과가 반환될때까지 기다린다.
//         yield put({
//             type: GET_POSTS_SUCCESS,
//             payload: posts
//         })
//         // console.log('getPostsSaga','after API call')
//     } catch (e) {
//         yield put({
//             type: GET_POSTS_ERROR,
//             error: true,
//             payload: e
//           });
//     }
// }

// function* getPostSaga(action) {
//     const param = action.payload
//     const id = action.meta
//     try{
//         const post = yield call(postsAPI.getPostById, param)
//         yield put({
//             type: GET_POST_SUCCESS,
//             payload: post,
//             meta: id
//         })
//     } catch (e) {
//         yield put({
//             type: GET_POST_ERROR,
//             payload: e,
//             meta: id
//         })
//     }
// }

export const goToHome = () => ({type:GO_TO_HOME})

export function* goTohomeSaga() {
    const history = yield getContext('history')
    history.push('/')
}

export function* postsSaga() {
    // yield takeEvery(GET_POSTS, getPostsSaga);
    // yield takeEvery(GET_POST, getPostSaga);
    yield takeEvery(GO_TO_HOME, goTohomeSaga)
}


// export const goToHome = () => (dispatch, getState, {history}) => {
//     history.push('/')
// }


// function getPosts(){ //thunk 함수
//     return async (dispatch, getState) => {
//         dispatch({type:GET_POSTS})
//         try {
//             const data = await postAPI.getPosts();
//             dispatch({type:GET_POSTS_SUCCESS, data})
//         } catch (e) {
//             dispatch({type:GET_POSTS_ERROR, error: e})
//         }
//     }
// } 

// const getPost = (id) => async (dispatch, getState) => {
//     dispatch({type: GET_POST})
//     try {
//         const res = await postAPI.getPost(id)
//         dispatch({type: GET_POST_SUCCESS})
//     } catch (e) {
//         dispatch({type: GET_POST_ERROR})
//     }
// }

// 3. initialState
const initialState = {
    posts: reducerUtils.initial(),
    post: {}
}

// // 4. reducer 함수
// export default function posts(state=initialState, action) {
//     switch(action.type) {
//         case GET_POSTS:
//         case GET_POSTS_SUCCESS:
//         case GET_POSTS_ERROR:
//             return handleAsyncActions(GET_POSTS, 'posts', true)(state, action)
//         case GET_POST:
//         case GET_POST_SUCCESS:
//         case GET_POST_ERROR:
//             return handleAsyncActionsById(GET_POST, 'post', true)(state, action)
//         // case CLEAR_POST:
//         //     return {
//         //         ...state,
//         //         post: reducerUtils.initial()
//         //     }
//         default:
//             return state;
//     }
// }


