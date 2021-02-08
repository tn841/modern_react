import React, {useState} from 'react'

type MyFormProps = {
    onSubmit: (form: {name: string; description: string}) => void
}

function MyForm({onSubmit}: MyFormProps) {
    const [input, setInput] = useState({
        name: '',
        description: ''
    })
    const {name, description} = input

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // console.log("submit : ", name, description)
        onSubmit(input)
        setInput({
            name: '',
            description: ''
        })
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        // console.log(name, value)
        setInput({
            ...input,
            [name]: value
        })
    }

    return (
        <form onSubmit={handleSubmit} >
            <input name="name" value={name} onChange={handleChange} />
            <input name="description" value={description} onChange={handleChange} />
            <button type="submit">등록</button>
        </form>
    )
}

export default MyForm