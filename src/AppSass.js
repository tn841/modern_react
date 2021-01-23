import React from 'react';
import Button from './components/Button'
import './App.scss';

function AppSass(){
    return (
        <>
        <div className="App">
            <div className="buttons">
                <Button size='large'>BUTTON</Button>
                <Button>BUTTON</Button>
                <Button size='small'>BUTTON</Button>
            </div>
            <div className="buttons">
                <Button color='pink' size='large'>BUTTON</Button>
                <Button color='pink' outline>BUTTON</Button>
                <Button color='pink' size='small'>BUTTON</Button>
            </div>
            <div className="buttons">
                <Button color='gray' size='large' outline>BUTTON</Button>
                <Button color='gray'>BUTTON</Button>
                <Button color='gray' size='small'>BUTTON</Button>
            </div>
            <div className="buttons">
                <Button fullWidth>BUTTON</Button>
                <Button fullWidth color='gray'>BUTTON</Button>
                <Button fullWidth color='pink'
                    onClick={ () => console.log('클릭!')}
                >BUTTON</Button>
            </div>
            
        </div>
        </>
    )
}

export default AppSass;