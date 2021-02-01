import React from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import Counter from '../todoComponents/Counter'
import { increase, decrease, setDiff } from '../modules/counter'

function CounterContainer(){
    const {number, diff} = useSelector(state => ({
        number: state.counter.number,
        diff: state.counter.diff
    }), shallowEqual)

    const dispatch = useDispatch();

    const onIncrease = () => dispatch(increase())
    const onDecrease = () => dispatch(decrease())
    const onSetDiff = (diff) => dispatch(setDiff(diff))

    return (
        <Counter
            number={number}
            diff={diff}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
            onSetDiff={onSetDiff}
        />
    )
}

export default CounterContainer