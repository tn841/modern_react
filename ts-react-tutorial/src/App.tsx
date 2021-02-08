import React from 'react';
import Greeting from './Greeting'

function App() {
  const onClick = (name: String) => {
    console.log(`${name} say Hello`)
  }
  return (
    <Greeting name="Hello" onClick={onClick} />
  );
}

export default App;
