import axios from 'axios'

//////////// API 요청 보내는 비동기 함수 /////////////
export async function getUsers() {
    const res = await axios.get('https://jsonplaceholder.typicode.com/users')
    return res.data
}

export async function getUser(id){
    const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
    return res.data
}