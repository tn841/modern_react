import React from 'react';
import Counter from './components/Counter'
import TodoList from './components/TodoList'

function App() {
  return (
    <div style={{ padding: '5px' }}>
      <Counter />
      <TodoList />
    </div>
  );
}

export default App;
