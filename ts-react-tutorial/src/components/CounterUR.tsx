import React, {useReducer} from 'react'

type Action = {type: 'INCREASE'} | {type: 'DECREASE'};

const reducer = (state: number, action: Action) => {
    switch(action.type) {
        case 'INCREASE':
            return state + 1
        case 'DECREASE':
            return state - 1
        default:
            return state
    }
}

function CounterUR(){
    const [state, dispatch] = useReducer(reducer, 0)

    const onIncrease = () => {dispatch({type: 'INCREASE'})}
    const onDecrease = () => {dispatch({type: 'DECREASE'})}

    return (
        <div>
          <h1>{state}</h1>
          <div>
            <button onClick={onIncrease}>+1</button>
            <button onClick={onDecrease}>-1</button>
          </div>
        </div>
      );
}

export default CounterUR