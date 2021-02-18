import { createSlice } from "@reduxjs/toolkit";
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const githubSlice = createSlice({
    name: 'github',
    initialState: {},
    reducers: {
        getUser: (state, action: PayloadAction) => {},
    }
})