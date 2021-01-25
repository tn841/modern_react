import React from 'react';
import styled from 'styled-components';

const AppBlock = styled.div`
    width: 512px;
    height: 768px;
    
    position: relative;
    background: white;
    border-radius: 16px;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.04);

    margin: 0 auto;

    margin-top: 3rem;
    margin-bottom: 2rem;
    display: flex;
    flex-direction: column;
`;

function TodoTemplate({children}) {
    return (
        <AppBlock>{children}</AppBlock>
    )
}

export default TodoTemplate