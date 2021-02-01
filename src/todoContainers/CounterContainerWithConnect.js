import React from 'react'
import { connect } from 'react-redux'
import Counter from '../todoComponents/Counter'
import { increase, decrease, setDiff } from '../modules/counter'

function CounterContainer({number, diff, onIncrease, onDecrease, onSetDiff}){
    console.log('CounterContainerWithConnect')
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

// mapStateToProps는 리덕스 스토어의 state를 조회해서 어떤 것을 컴포넌트의 props로 넣어줄지 정의한다.
const mapStateToProps = state => ({
    number: state.counter.number,
    diff: state.counter.diff
})

// mapDispatchToProps는 리덕스 스토어의 dispatch를 컴포넌트의 props로 넣어주는 역할이다.
const mapDispatchToProps = dispatch => ({
    onIncrease: () => dispatch(increase()),
    onDecrease: () => dispatch(decrease()),
    onSetDiff: diff => dispatch(setDiff(diff))
})

// react-redux의 connect함수는 인자로 mapStateToProps와 mapDispatchToProps를 받는다.
export default connect(mapStateToProps, mapDispatchToProps)(CounterContainer)

/*
// 위와 동일한 export
const enhance = connect(mapStateToProps, mapDispatchToProps);
export default enhance(CounterContainer)
*/
