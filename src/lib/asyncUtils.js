
// 내부에 Promise 객체(API 통신)를 사용하는 Thunk 함수를 생성해주는 함수정의
// createPromiseThunk(GET_POSTS, postAPI.getPosts)
export const createPromiseThunk = (type, promiseCreator) => {
    const [SUCCESS, ERROR] = [`$(type)_SUCCESS`, `$(type)_ERROR`]

    return param => async (dispatch, getState) => {
        dispatch({type, param});
        try {
            // 결과물은 payload 라는 이름으로 통일한다.
            const payload = await promiseCreator(param)
            dispatch({type: SUCCESS, payload})
        } catch (e) {
            dispatch({type: ERROR, payload: e, error: true})
        }
    }
}

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
    error: error =>({
        loading: false,
        data: null,
        error: error
    })
}
