import React, {useState, useRef} from 'react'

function InputSample() {
    const [inputs, setInputs] = useState({
        name: '',
        nickname: ''
    });

    const nameInput = useRef()

    const { name, nickname } = inputs;

    const onChange = (e) => {
        const {value, name} = e.target
        setInputs({
            ...inputs, //기존 객체 복사
            [name]: value //name을 key로 갖는 value 설정
        })
    }

    const onReset = () => {
        setInputs({
            name: '',
            nickname: ''
        });
        nameInput.current.focus();
    }

    return (
        <>
            <input 
                name='name' 
                placeholder="이름" 
                onChange={onChange} 
                value={name}
                ref={nameInput}
            />
            <input 
                name='nickname' 
                placeholder="닉네임" 
                onChange={onChange} 
                value={nickname}
            />
            <button onClick={onReset}>초기화</button>
            <div>
                <b>값: </b>
                {name} ({nickname})
            </div>
        </>
    )
}

export default InputSample