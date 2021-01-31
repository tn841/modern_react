import React from 'react'
import CounterContainer from './todoContainers/CounterContainer'
import TodosContainer from './todoContainers/TodosContainer'

const AppRedux = () => (
    <div style={{margin: "10px"}}>
        <CounterContainer />
        <TodosContainer />
    </div>
    );
export default AppRedux