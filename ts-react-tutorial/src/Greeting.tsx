import React from 'react';

type GreetingProps = {
    name: string;
    mark: string;
    optional?: string;
    onClick: (name: string) => void;
}

function Greeting({name, mark, optional, onClick}: GreetingProps) {
    const handleClick = () => onClick(name);
    return (
        <div>
            Hello, {name} {mark}
            {optional && <p>{optional}</p>}
            <div>
                <button onClick={handleClick}>Click Me</button>
            </div>
        </div>
    )
}

Greeting.defaultProps = {
    mark: '!'
}

export default Greeting