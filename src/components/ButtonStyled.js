import React from 'react'
import styled, { css } from 'styled-components'
import {lighten, darken} from 'polished'

const colorStyled = css`
    ${ ( {theme, color} ) => {
        const selected = theme.palette[color];
        // console.log(selected)
        return css`
            background: ${ selected };
            &:hover {
                background: ${lighten(0.1, selected)};
            }
            &:active {
                background: ${darken(0.1, selected)};
            }
            ${ props => {
                return props.outline && css`
                    color: ${selected};
                    background: none;
                    border: 1px solid ${selected};
                    &:hover {
                        background: ${selected};
                        color: white;
                    }
                `;
            }}
        `
    }}
`;
const sizes = {
    large: {
        height: '3rem',
        fontSize: '1.25rem'
    },
    medium: {
        height: '2.25rem',
        fontSize: '1rem'
    },
    small : {
        height: '1.75rem',
        fontSize: '0.875rem'
    }
}
const sizeStyled = css`
    ${ ( {size, fullWidth} ) => {
        return css`
            height: ${sizes[size].height};
            font-size: ${sizes[size].fontSize};
            ${ fullWidth && css`
                justify-content: center;
                width: 100%;
            `}
        `;
    }}
`;


const StyledButton = styled.button`
    /* 공통 스타일 */
    // display: inline-flex;
    outline: none;
    border: none;
    border-radius: 4px;
    color: white;
    font-weight: bold;
    cursor: pointer;
    padding-left: 1rem;
    padding-right: 1rem;

    /* 크기 */
    ${ sizeStyled }

    /* 색상 */
    ${ colorStyled }

    


    /* 기타 */
    & + & {
        margin-left: 1rem;
    }
`;

function ButtonStyled({children, ...rest}) {
    
    return (
        <StyledButton {...rest}>
            {children}
        </StyledButton>
    )
}

ButtonStyled.defaultProps = {
    color: 'blue',
    size: 'medium'
}

export default ButtonStyled;