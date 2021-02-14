import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { RootState } from '../modules'
import {increment, decrement, setDiff} from '../modules/counter'

function Counter(){

    // state 타입을 RootState로 지정해야한다.
    const {count, diff} =  useSelector( (state:RootState) => state.counter)
    const dispatch = useDispatch()

    const onIncrement = () => {
        dispatch(increment())
    }
    const onDecrement = () => {
        dispatch(decrement())
    }
    const onSetDiff = (e: any) => {
        const value = parseInt(e.target.value)
        dispatch(setDiff(value))
    }

    return (
        <>
            <h1>Counter</h1>
            <span>{count}</span><input type="number" min="1" onChange={onSetDiff} value={diff}/>
            <button type="button" onClick={onIncrement}>+{diff}</button>
            <button type="button" onClick={onDecrement}>-{diff}</button>
        </>
    )
}

export default Counter