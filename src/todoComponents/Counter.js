import React from 'react'

function Counter({number, diff, onIncrease, onDecrease, onSetDiff}){
    const onChange = (e) => {
        onSetDiff(parseInt(e.target.value, 10))
    }
    return (
        <div>
            <h1>Counter</h1>
            <hr/>
            <h2>{number}</h2>
            <div>
                <input type="number" value={diff} min="1" onChange={onChange}/>
                <button onClick={onIncrease}>+</button>
                <button onClick={onDecrease}>-</button>
            </div>
        </div>
    )
}

export default Counter