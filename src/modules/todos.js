// 1. 액션 타입
const ADD_TODO = 'todos/ADD_TODO'
const TOGGLE_TODO = 'todos/TOGGLE_TODO'

// 2. 액션 생성 함수
let nextId = 1;
export function addTodo(text){
    return{
        type:ADD_TODO,
        todo: {
            id: nextId++,
            text
        }
    }
}
export function toggleTodo(id) {
    return {
        type:TOGGLE_TODO,
        id
    }
}

// 3. initialState 선언
/*{
    id: 1,
    text: '예시',
    done: false
  } */
const initialState = [ ]

// 4. reducer 함수 정의
export default function todos(state=initialState, action) {
    switch(action.type){
        case ADD_TODO:
            return state.concat(action.todo)
        case TOGGLE_TODO:
            return state.map( todo => 
                todo.id === action.id ? {...todo, done: !todo.done} : todo)
        default:
            return state
    }
}