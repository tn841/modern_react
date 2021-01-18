import React, {useState} from 'react';

function Counter(){

    const [number, setnumber] = useState(0)

    const onIncrease = () => {
        console.log('increase');
        setnumber(prevNum => prevNum + 1)
    }

    const onDecrease = () => {
        console.log('decrease');
        setnumber(prevNum => prevNum - 1)
    }

    return (
        <div>
            <h1>{number}</h1>
            <button onClick={onIncrease}>+1</button>
            <button onClick={onDecrease}>-1</button>
        </div>
    )
}

export default Counter;