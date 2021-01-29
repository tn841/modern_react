import {createStore} from 'redux'
console.log("Hello");

// 리덕스에서 관리할 state정의
const initialState = {
    counter: 0,
    text: '',
    list: []
}

// 액션 타입 정의
const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';
const CHANGE_TEXT = 'CHANGE_TEXT';
const ADD_TO_LIST = 'ADD_TO_LIST';

// 액션 생성 함수 정의
function increase() {
    return {
        type: INCREASE
    }
}

const decrease = () => ({
    type: DECREASE
})

const changeText = (text) => ({
    type: CHANGE_TEXT,
    text
})

const addToList = item => ({
    type: ADD_TO_LIST,
    item
})

// 리듀서 만들기
function reducer(state=initialState, action) {
    switch(action.type){
        case INCREASE:
            return {
                ...state,
                counter: state.counter + 1
            };
        case DECREASE:
            return {
                ...state,
                counter: state.counter -1
            }
        case CHANGE_TEXT:
            return {
                ...state,
                text: action.text
            }
        case ADD_TO_LIST:
            return {
                ...state,
                list: state.list.concat(action.item)
            }
        default:
            return state
    }
}

// 스토어 생성하기
const store = createStore(reducer)
console.log(store.getState())   // 스토어 내부의 상태 조회

// state가 바뀔 때 마다 호출되는 liistener 함수
const listener = () => {
    const state = store.getState();
    console.log(state)
}

// 구독을 해제하고 싶을 때는 unsubscribe()를 호출 한다.
const unsubscribe = store.subscribe(listener)



// 액션을 디스패치 해본다.
store.dispatch(increase())
store.dispatch(decrease())
store.dispatch(changeText('안녕하세요.'))
store.dispatch(addToList({id: 1, text: 'gksk'}))