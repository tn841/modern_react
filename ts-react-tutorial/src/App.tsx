import React from 'react';
import Counter from './components/Counter'
import MyForm from './components/MyForm'
import CounterUR from './components/CounterUR'
import ReducerSample from './components/ReducerSample'
import {SampleProvider} from './components/SampleContext'

function App() {

  return (
    <SampleProvider>
      <Counter />
      <MyForm onSubmit={(form: {
          name: string;
          description: string;
      }) => {
        console.log(form)
      }}/>
      <CounterUR />
      <hr/>
      <ReducerSample />
    </SampleProvider>
  );
}

export default App;
