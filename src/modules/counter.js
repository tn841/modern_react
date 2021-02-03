import { delay, put, takeEvery, takeLatest } from 'redux-saga/effects'

// 액션 타입 만들기
export const INCREASE = 'INCREASE'
export const DECREASE = 'DECREASE'
export const SET_DIFF = 'SET_DIFF'
const INCREASE_ASYNC = 'INCREASE_ASYNC';
const DECREASE_ASYNC = 'DECREASE_ASYNC';


// 액션 생성 함수 만들기
export const increase = () => {
    return {type:INCREASE}
}
export const decrease = () => {
    return {type:DECREASE}
}
export const setDiff = (diff) => {
    return  {type:SET_DIFF, diff}
}

//thunk 만들기
// export const increaseAsync = () => (dispatch, getState) => {
//     setTimeout(() => {dispatch(increase())}, 1000)
// }
// export const decreaseAsync = () => (dispatch, getState) => {
//     setTimeout(() => {dispatch(decrease())}, 1000)
// }
export const increaseAsync = () => {
    return {type:INCREASE_ASYNC}
}
export const decreaseAsync = () => {
    return {type:DECREASE_ASYNC}
}

// 7-10. redux-saga의 제너레이터 함수(saga) 만들기
function* increaseSaga() {
    yield delay(1000) // 1초 지연
    yield put(increase()) // put은 특정 action을 dispatch 해준다.
}

function* decreaseSaga(){
    yield delay(1000)
    yield put(decrease())
}

export function* counterSaga() {
    yield takeEvery(INCREASE_ASYNC, increaseSaga)   // 모든 INCREASE_ASYNC 액션 처리
    yield takeLatest(DECREASE_ASYNC, decreaseSaga)  // 마지막에 디스패치된 DECREASE_ASYNC 액션 처리
}


// initialState 선언
export const initialState = {
    number: 0,
    diff: 1
}


// 리듀서 작성하기
export default function counter(state=initialState, action) {
    switch(action.type) {
        case INCREASE:
            return {
                ...state,
                number: state.number + state.diff
            }
        case DECREASE:
            return {
                ...state,
                number: state.number - state.diff
            }
        case SET_DIFF:
            return {
                ...state,
                diff: action.diff
            }
        default:
            return state
    }
}