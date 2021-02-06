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

