interface Person {
    name: string;
    age?: number; // ?는 설정할 수도 있고 안할 수도 있다는 의미
}

interface Developer extends Person {
    skills: string[];
}

const person: Person = {
    name: '김수민',
    age: 30
}

const expert: Developer = {
    name: '김개발',
    age: 31,
    skills: ['javascript', 'react']
}

const people: Person[] = [person, expert]