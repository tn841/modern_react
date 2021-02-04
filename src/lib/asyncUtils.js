import { call, put } from "redux-saga/effects";

///////////////// Thunk
// 내부에 Promise 객체(API 통신)를 사용하는 Thunk 함수를 생성해주는 함수정의
// 호출 형태 : createPromiseThunk(GET_POSTS, postAPI.getPosts)
export const createPromiseThunk = (type, promiseCreator) => {
    const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

    return param => async (dispatch, getState) => {
        dispatch({type, param});
        try {
            // 결과물은 payload 라는 이름으로 통일한다.
            const payload = await promiseCreator(param)
            dispatch({type: SUCCESS, payload})
        } catch (e) {
            dispatch({type: ERROR, error: e})
        }
    }
}

// 특정 postId를 처리하는 Thunk 생성 함수
const defaultIdSelector = param => param;
export const createPromiseThunkById = (
    type, 
    promiseCreator, 
    idSelector=defaultIdSelector
) => {
    const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`]
    return (param) => async (dispatch, getState) => {
        const id = idSelector(param);
        dispatch({type, meta: id});
        try{
            const payload = await promiseCreator(param)
            dispatch({type: SUCCESS, payload, meta: id})
        } catch (e) {
            dispatch({type: ERROR, error: true, payload: e, meta: id})
        }
    }
}


/////////////////// SAGA
/* 
API를 요청하는 saga함수에서 반복되는 로직은,
1. call()로 API요청을 보내고 반환을 기다리기
2. 반환된 데이터로 SUCCESS action put
3. 에러 발생 시 ERROR action put
*/

export function createPromiseSaga(type, promiseCreator) {
    const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`]
    
    return function* (action){
        try{
            const res = yield call(promiseCreator, action.payload)
            console.log(res)
            yield put({
                type: SUCCESS,
                payload : res
            })
        } catch (e) {
            yield put({
                type: ERROR,
                error: true,
                payload: e
            })
        }
    }
}

export const createPromiseSagaById = (type, promiseCreator) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  return function* saga(action) {
    const id = action.meta;
    try {
      const payload = yield call(promiseCreator, action.payload);
      yield put({ type: SUCCESS, payload, meta: id });
    } catch (e) {
      yield put({ type: ERROR, error: e, meta: id });
    }
  };
};




// 리듀서 반복되는 코드를 리팩토링 하기위한 코드
export const reducerUtils = {
    initial: (initialData = null) => ({
        loading: false,
        data: initialData,
        error: null
    }),
    loading: (prevState=null) => ({
        loading: true,
        data: prevState,
        error: null
    }),
    success: payload => ({
        loading: false,
        data: payload,
        error: null
    }),
    error: error => ({
        loading: false,
        data: null,
        error: error
    })
}


// 비동기 관련 액션들을 처리하는 리듀서를 만들어줍니다.
// type 은 액션의 타입, key 는 상태의 key (예: posts, post) 입니다.
export const handleAsyncActions = (type, key, keepData = false) => {
    const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
    return (state, action) => {
        switch (action.type) {
            case type:
                return {
                    ...state,
                    [key]: reducerUtils.loading(keepData ?  state[key].data : null)
                }
            case SUCCESS:
                return {
                    ...state,
                    [key]: reducerUtils.success(action.payload)
                }
            case ERROR:
                return {
                    ...state,
                    [key]: reducerUtils.error(action.payload)
                }
            default:
                return state;
            }
    }
}

// id별로 처리하는 handleAsyncActionsById..
export const handleAsyncActionsById = (type, key, keepData = false) => {
    const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`]

    return (state, action) => {
        const id = action.meta;
        switch(action.type) {
            case type:
                return {
                    ...state,
                    [key]: {
                        ...state[key],
                        [id]: reducerUtils.loading(
                            keepData 
                            ? state[key][id] && state[key][id].data 
                            : null
                        )
                    }
                }
            case SUCCESS:
                return {
                    ...state,
                    [key]: {
                        ...state[key],
                        [id]: reducerUtils.success(action.payload)
                    }
                }
            case ERROR:
                return {
                    ...state,
                    [key] : {
                        ...state[key],
                        [id]: reducerUtils.error(action.payload)
                    }
                }
            default:
                return state

        }
    }
}