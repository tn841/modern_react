// 액션 타입 만들기
export const INCREASE = 'INCREASE'
export const DECREASE = 'DECREASE'
export const SET_DIFF = 'SET_DIFF'


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