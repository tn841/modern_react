import {createSlice, PayloadAction} from '@reduxjs/toolkit'

type SliceState = {
    count : number;
    diff : number;
}

const initialState: SliceState = {count: 0, diff: 0}

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment : (state: SliceState, action: PayloadAction<number>) => {
            state.count = action.payload
        },

    }
})