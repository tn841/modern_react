import React, {useCallback} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import Todos from '../todoComponents/Todo'
import {addTodo, toggleTodo} from '../modules/todos'

function TodosContainer(){
    const todos = useSelector(state => (state.todos))
    const dispatch = useDispatch();

    const onCreate = (text) => {dispatch(addTodo(text))}
    // const onCreate = useCallback((text) => {dispatch(addTodo(text))}, [dispatch])
    const onToggle = (id) => {dispatch(toggleTodo(id))}

    return (
        <Todos 
            todos={todos}
            onCreate={onCreate}
            onToggle={onToggle}
        />
    )
}

export default TodosContainer