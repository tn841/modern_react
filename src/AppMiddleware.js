import React from 'react'
import CounterContainer from './todoContainers/CounterContainerWithMiddleware'


const AppMiddleware = () => (
    <div style={{margin: "10px"}}>
        <CounterContainer />
    </div>
    );
export default AppMiddleware