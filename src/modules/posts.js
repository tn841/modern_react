import * as postAPI from '../api/posts'

// 1. action type 정의
const GET_POSTS = 'GET_POSTS'
const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS'
const GET_POSTS_ERROR = 'GET_POSTS_ERROR'

const GET_POST = 'GET_POST'
const GET_POST_SUCCESS = 'GET_POST_SUCCESS'
const GET_POST_ERROR = 'GET_POST_ERROR'


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

 */
function getPosts(){ //thunk 함수
    return async (dispatch, getState) => {
        dispatch({type:GET_POSTS})
        try {
            const data = await postAPI.getPosts();
            dispatch({type:GET_POSTS_SUCCESS, data})
        } catch (e) {
            dispatch({type:GET_POSTS_ERROR, error: e})
        }
    }
} 

const getPost = (id) => async (dispatch, getState) => {
    dispatch({type: GET_POST})
    try {
        const res = await postAPI.getPost(id)
        dispatch({type: GET_POST_SUCCESS})
    } catch (e) {
        dispatch({type: GET_POST_ERROR})
    }
}

// 3. initialState
const initialState = {
    posts: {
        loading: false,
        data: null,
        error: null
    },
    post: {
        loading: false,
        data: null,
        error: null
    }
}

// 4. reducer 함수
export default function posts(state=initialState, action) {
    switch(action.type) {
        case GET_POSTS:
            return {
                ...state,
                posts: {
                    loading: true,
                    data: null,
                    error: null
                }
            }
        case GET_POSTS_SUCCESS:
            return {
                ...state,
                posts: {
                    loading: false,
                    data: action.posts,
                    error: null   
                }
            }
        case GET_POSTS_ERROR:
            return {
                ...state,
                posts: {
                    loading: false,
                    data: null,
                    error: action.error
                }
            }
        case GET_POST:
            return {
                ...state,
                post: {
                    loading: true,
                    data: null,
                    error: null
                }
            };
            case GET_POST_SUCCESS:
            return {
                ...state,
                post: {
                    loading: true,
                    data: action.post,
                    error: null
                }
            };
            case GET_POST_ERROR:
            return {
                ...state,
                post: {
                    loading: true,
                    data: null,
                    error: action.error
                }
            };
            default:
                return state;
    }
}