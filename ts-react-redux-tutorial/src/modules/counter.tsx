import {createSlice, PayloadAction} from '@reduxjs/toolkit'

type SliceState = {
    count : number;
    diff : number;
}

const initialState: SliceState = {count: 0, diff: 1}

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment : (state: SliceState) => {
            state.count = state.count + state.diff
        },
        decrement : (state: SliceState) => {
            state.count = state.count - state.diff
        },
        setDiff : (state: SliceState, action: PayloadAction<number>) => {
            state.diff = action.payload
        }

    }
})

export default counterSlice.reducer
export const {increment, decrement, setDiff} = counterSlice.actions