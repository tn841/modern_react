## 8장. 리액트 프로젝트에서 타입스크립트 사용하기

JavaScript는 weakly typed 언어이다.

```js
let value = 1;
value = 'hi';
value = [1,2,3,4]
value = null
```

IDE를 이용할 때 자동완성 기능이 Java / Python 등의 언어처럼 제대로 동작하지 않는다. TypeScript를 이용하면 이러한 개발의 불편함을 줄여준다.

TypeScript를 이용하는 이유는 다음 두가지 이다.
1. IDE를 적극 활용 가능 (자동완성, 타입확인)
2. 실수방지

TypeScript의 중요한 것을 알아보고 리액트에서 사용하는 방법을 알아본다.
TypeScript에 대해서 제대로 알아보고 싶다면 다음[링크](https://typescript-kr.github.io/)를 참조한다.

## 8-1. 타입 스크립트 연습

새로운 타입스크립트 프로젝트를 생성해본다.

```js
// mkdir ts-practice
// cd ts-practice
// npm init -y
```

### 타입스크립트 설정파일 생성하기

타입스크립트 설정파일인 tsconfig.json을 프로젝트 디렉토리 안에 생성한다.

#### tsconfig.json
```js
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true
  }
}
```

보통 직접 tsconfig를 작성하지 않고 명령어로 생성한다.

먼저, typescript를 global로 설치한다.

```bash
$ npm install -g typescript
```
그리고 프로젝트 디렉토리안에서 tsc --init을 입력하면 tsconfig.json 파일이 자동생성된다.

tsconfig의 옵션들에 대해 알아본다.

- target : 컴파일된 코드가 어떤 환경에서 실행될 지 정의, 예를들어 arrow function을 사용하고 target을 es5를 설정하면 function 키워드 함수로 변환해준다. es6로 설정하면 arrow function을 그대로 유지한다.
- module : 컴파일된 코드가 어떤 모듈 시스템을 사용할지 정의한다. 'common'으로 하면 export default Sample을 했을 때 exports.default = Sample로 변환해주지만, es2015로 하면 export default Sample을 유지한다.
- strict : 모든 타입 체킹 옵션을 활성화한다는 것을 의미
- esModuleInterop : commonjs 모듈 형태로 이루어진 파일을 es2015 모듈 형태로 불러올 수 있게 해줍니다. [(참고)](https://stackoverflow.com/questions/56238356/understanding-esmoduleinterop-in-tsconfig-file)
- outDir : 컴파일된 파일 저장 경로


### 타입스크립트 파일 만들기
src 디렉토리를 만들고 practice.ts라는 파일을 생성해보자.

```ts
const message : string = 'hello world'
console.log(message)
```
':string' 코드는 message 상수가 문자열임을 명시해준다. 만약 message 상수에 정수를 할당하면 에디터상에서 오류를 표시해준다.

이제 프로젝트 루트에서 ```tsc``` 명령어를 입력해본다. 그러면 ./dist/practice.js 경로에 다음과 같은 파일이 생성된다.

```js
"use strict";
var message = 'hello world';
console.log(message);
```

### ts 기본 타입
```js
let count = 0;
count += 1;
count = '갑자기 문자열' // 이러면 오류발생

const message : string = '안녕 타입스크립트'
const done : boolean = true
const numbers : number[] = [1,2,3] // 숫자배열
const messages : string[] = ['안녕', '타입스크립트']

messages.push(1)    // 문자열 배열에 숫자를 넣을 수 없다.

let mightBeUndefined : string | undefined = undefined // string일 수도, undefined일 수도 있다.
let nullableNumber : number | null 

let color : 'red' | 'orange' | 'yellow' = 'red'
color = 'blue'  // 오류다
```
위 파일을 tsc로 컴파일하면 다음과 같은 에러 메시지가 출력된다.

![](../img/ts01.PNG)

### 함수에서 타입정의하기
```js
function sum(x:number, y: number): number {
    return x+y
}
sum(1, 22)
```
파라미터로 어떤 타입을 넣어야하는지 바로 알 수 있다. 또한 리턴값의 타입도 알 수 있다.

참고로 함수에서 아무것도 반환하지 않는다면 반환 타입은 void이다.

```js
function returnNothing(): void {
  console.log('I am just saying hello world');
}
```

### interface 사용하기
interface는 클래스 또는 객체를 위한 타입을 지정 할 때 사용되는 문법이다.

```js
interface Shape {
    getArea(): number; // Shape interface에는 getArea()라는 함수가 반드시 있어야하며, 반환값은 number dlek.
}

class Circle implements Shape {
    radius: number;

    constructor(radius: number) {
        this.radius = radius
    }

    getArea() {
        return this.radius * this.radius * Math.PI;
    }
}

class Rectangle implements Shape {
    width: number;
    height: number;
    constructor(width: number, height: number) {
      this.width = width;
      this.height = height;
    }
    getArea() {
      return this.width * this.height;
    }
  }
  
  const shapes: Shape[] = [new Circle(5), new Rectangle(10, 5)];
  
  shapes.forEach(shape => {
    console.log(shape.getArea());
  });
```


### 일반 객체를 interface로 타입 설정하기
클래스가 아닌 일반 객체를 interface를 사용하여 타입지정 할 수 있다.

```js
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
```

### Type Alias 사용하기
```js
type Person = {
    name: string,
    age?: number
}

type Developer = Person & { // &는 타입을 합칠때 사용
    skills: string[]
}

type People: Person[];
type Color: 'red' | 'green' | 'blue';
```


### Generics
제너릭(Generics)은 타입스크립트에서 함수, 클래스, interface, type alias 를 사용하게 될 때 여러 종류의 타입에 대하여 호환을 맞춰야 하는 상황에서 사용하는 문법
```js
function merge(a: any, b: any): any {
  return {
    ...a,
    ...b
  };
}

const merged = merge({ foo: 1 }, { bar: 1 });
```
any를 쓰면 타입 유추를 할 수 없다. 이런상황에서 generics를 사용한다.

```js
function wrap<T> (a: T) {
    return {a}
}
```

### interface에서 Generics 사용
```js
interface Items<T> {
  list: T[];
}

const items: Items<string> = {
  list: ['a', 'b', 'c']
};
```

### type에서 Generics 사용
```js
type Items<T> = {
  list: T[];
};

const items: Items<string> = {
  list: ['a', 'b', 'c']
};
```

### 클래스에서 Generics 사용
```js
class Queue<T> {
  list: T[] = [];
  get length() {
    return this.list.length;
  }
  enqueue(item: T) {
    this.list.push(item);
  }
  dequeue() {
    return this.list.shift();
  }
}

const queue = new Queue<number>();
queue.enqueue(0);
```