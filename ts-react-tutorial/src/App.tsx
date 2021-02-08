import React from 'react';
import Counter from './components/Counter'
import MyForm from './components/MyForm'

function App() {

  return (
    <div>
      <Counter />
      <MyForm onSubmit={(form: {
          name: string;
          description: string;
      }) => {
        console.log(form)
      }}/>
    </div>
  );
}

export default App;
