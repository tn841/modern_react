import React from 'react'
import styled, { css } from 'styled-components'
import { MdDone, MdDelete } from 'react-icons/md'
import { useTodoDispatch } from '../TodoContext'

const Remove = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: #dee2e6;
    font-size: 24px;
    cursor: pointer;
    &:hover {
    color: #ff6b6b;
    }
    display: none;
`;

const TodoItemBlock = styled.div`
    display: flex;
    align-items: center;
    padding-top: 12px;
    padding-bottom: 12px;
    &:hover {
        ${Remove} {    //Component Selector 라는 기능
            display: initial;
        }
    }
`;

const CheckCircle = styled.div`
    width: 32px;
    height: 32px;
    border-radius: 16px;
    border: 1px solid #ced4da;
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
    cursor: pointer;
    ${props =>
    props.done &&
    css`
        border: 1px solid #38d9a9;
        color: #38d9a9;
    `}
`;

const Text = styled.div`
    flex: 1;
    font-size: 21px;
    color: #495057;
    ${props =>
        props.done &&
        css`
        color: #ced4da;
        `}
`;

function TodoItem({todo}){
    const {text, done, id} = todo;
    
    const dispatch = useTodoDispatch();
    const onToggle = () => {dispatch({type:'TOGGLE', id})}
    const onRemove = () => {dispatch({type:'REMOVE', id})}

    return (
        <TodoItemBlock >
            <CheckCircle onClick={ onToggle } done={done}>
                {done && <MdDone />}
            </CheckCircle>
            <Text  done={done} >{text}</Text>
            <Remove>
                <MdDelete onClick={ onRemove } />
            </Remove>
        </TodoItemBlock>
    )
}

export default TodoItem;