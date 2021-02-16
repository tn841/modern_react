import React, {useState, useRef} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {RootState} from '../modules'
import {Todo, addTodo} from '../modules/todoList'


function TodoList(){
    const todos = useSelector( (state: RootState) => state.todos )
    const dispatch = useDispatch();
    const [input, setInput] = useState<string>('')
    const nextId = useRef<number>(1)

    const onsubmit = (e: any) => {
        e.preventDefault();
        let temp_todo: Todo = {id:nextId.current, done:false, text:input}
        dispatch(addTodo(temp_todo))
        setInput('')
        nextId.current += 1;

    }
    const onchange = (e: any) => {
        // console.log(e.target.value)
        setInput(e.target.value)
    }
    return (
        <div>
            <h1>TodoList</h1>
            <form onSubmit={onsubmit}>
                <input type="text" name="text" value={input} onChange={onchange} />
                <input type="submit" value="submit"  />
            </form>
            <ul>
                {todos && todos.map( todo => <li key={todo.id}>{todo.text}, {todo.done}</li>)}
            </ul>
        </div>
    )
}

export default TodoList