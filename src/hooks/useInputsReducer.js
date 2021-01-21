import {useReducer, useCallback} from 'react'

function reducer(state, action){
    switch(action.type) {
        case 'INPUT_CHANGE':
            return {
                ...state,
                [action.name] : action.value
            }
        case 'INPUT_RESET':
            return {
                username: '',
                email: '',
            }
        default:
            return state
    }
}

function useInputsReducer(initialInputs) {
    // 컴포넌트에서 input을 핸들링하는 반복된 로직을
    // custom Hooks 함수로 만들어 재사용하기 쉽게 해보자.
    // input을 핸들링하는 반복된 로직으로는 onChange()와 reset()이 있다.

    const [state, dispatch] = useReducer(reducer, initialInputs);

    const onChange = useCallback( (e) => {
        const {name, value} = e.target
        dispatch({
            type: 'INPUT_CHANGE',
            name,
            value
        });
    }, [])

    const reset = useCallback(
        () => {
            dispatch({
                type: 'INPUT_RESET'
            })
        },
        [],
    )

    return [state, onChange, reset]

}

export default useInputsReducer;
