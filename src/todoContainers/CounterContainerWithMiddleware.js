import React from 'react'
import {useSelector, useDispatch, shallowEqual} from 'react-redux'
import {incrementAsync, decreaseAsync, setDiffRTK} from '../modules/counter'
import Counter from '../components/Counter'

function CounterContainer(){
    const {number, diff} = useSelector(state => ({
        number: state.counter.number,
        diff: state.counter.diff
    }), shallowEqual)

    const dispatch = useDispatch();

    const onIncrease = () => {
        const inc = dispatch(incrementAsync()).then((res) => {
            console.log(res)
        })        
    };
    const onDecrease = () => {dispatch(decreaseAsync())};
    const onSetDiff = (diff) => {dispatch(setDiffRTK(diff))};

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