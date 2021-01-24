import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import ButtonStyled from './components/ButtonStyled'

const AppBlock = styled.div`
    width: 512px;
    margin: 0 auto;
    margin-top: 4rem;
    border: 1px solid black;
    padding: 1rem
`;

const ButtonBlock =  styled.div`
    & + & {
        margin-top: 1rem
    }
`;

function AppStyled() {
    return (
        <ThemeProvider
            theme={{
                palette: {
                    blue: '#228be6',
                    gray: '#495057',
                    pink: '#f06595'
                }
            }}
        >
            <AppBlock>
            <ButtonBlock>
                    <ButtonStyled color='pink' size='large'>BUTTON</ButtonStyled>
                    <ButtonStyled color='pink'>BUTTON</ButtonStyled>
                    <ButtonStyled color='pink' size='small'>BUTTON</ButtonStyled>
                </ButtonBlock>
                <ButtonBlock>
                    <ButtonStyled color='gray' size='large'>BUTTON</ButtonStyled>
                    <ButtonStyled color='gray'>BUTTON</ButtonStyled>
                    <ButtonStyled color='gray' size='small'>BUTTON</ButtonStyled>
                </ButtonBlock>
                <ButtonBlock>
                    <ButtonStyled size='large'>BUTTON</ButtonStyled>
                    <ButtonStyled >BUTTON</ButtonStyled>
                    <ButtonStyled  size='small'>BUTTON</ButtonStyled>
                </ButtonBlock>
                <ButtonBlock>
                    <ButtonStyled outline size='large'>BUTTON</ButtonStyled>
                    <ButtonStyled outline >BUTTON</ButtonStyled>
                    <ButtonStyled outline  size='small'>BUTTON</ButtonStyled>
                </ButtonBlock>
                <ButtonBlock>
                    <ButtonStyled outline fullWidth color='gray' >BUTTON</ButtonStyled>
                </ButtonBlock>
                
                
            </AppBlock>
        </ThemeProvider>
    )
}
export default AppStyled;