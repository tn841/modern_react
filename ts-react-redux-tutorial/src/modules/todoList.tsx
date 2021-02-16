import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export type Todo = {
    id: number;
    text: string;
    done: boolean
}

type TodosState = Todo[]

const initialState: TodosState = []

const todoListSlice = createSlice({
    name:'todos',
    initialState: initialState,
    reducers: {
        addTodo: (state: TodosState, action: PayloadAction<Todo>) => {
            state.push(action.payload)
        }
    }
})

export default todoListSlice.reducer
export const { addTodo } = todoListSlice.actions