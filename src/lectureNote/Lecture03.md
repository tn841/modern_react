## 3장. 멋진 TodoList 만들기
TodoList App을 만드는 과정에서 지금까지 배운 다양한 개념들을 활용한다.
1. styled-components를 활용한 컴포넌트 스타일링
2. Context API를 사용한 전역 상태관리
3. 배열 상태 다루기

![완성된 TodoList 미리보기]()


## 3-1. 컴포넌트 만들기

### 만들어야 할 컴포넌트 확인하기
만들어야할 컴포넌트는 총 5개 이다.
1. TodoTemplate : TodoList의 레이아웃, 페이지 중앙에 그림자가 적용된 흰색박스
2. TodoHead : 오늘 날짜, 요일을 보여주고 할 일이 몇개 남았는지 보여준다.
3. TodoList : 할 일에 대한 정보가 들어있는 todos 배열을 map을 사용해 랜더링 해준다.
4. TodoItem : 각 할 일에 대한 정보를 랜더링 해준다. 좌측의 원을 누르면 Toggle 할 수 있다. 마우스를 올리면 휴지통 아이콘이 나타나고 누르면 삭제된다.
5. TodoCreate : 새로운 할 일을 등록할 수 있는 컴포넌트이다. TodoTemplate 하단에 할 일을 입력할 수 있는 폼이 나타난다.


### 페이지에 회색 배경색상 적용
styled-components를 사용하여 페이지에 회색(#e9ecef) 배경색상을 적용한다. styled-components에서 전역 스타일을 추가하고 싶을 땐, [createGlobalStyle](https://www.styled-components.com/docs/api#createglobalstyle)을 사용한다.


### TodoTemplate 만들기
- 흰색 박스 모양의 TodoTemplate 컴포넌트 생성

### TodoHead 만들기
- 오늘 날짜, 요일, 남을 todo 개수를 보여준다.
- TodoTemplate의 children으로 랜더링 해준다.

### TodoList 만들기
- background를 gary로 설정해서 TodoList 영역이 잘 설정되었는지 확인

### TodoItem 만들기
- [react-icons](https://react-icons.netlify.com/#/icons/md)에서 MdDone과 MdDelete 아이콘을 사용한다. (설치 필요)
- styled-components의 [Component Selector](https://www.styled-components.com/docs/advanced#referring-to-other-components)로 Remove 버튼 처리

![todo](../img/Todo01.PNG)

### TodoCreate 만들기
- react-icons의 MdAdd 아이콘 사용
- useState를 사용하여 open state를 관리한다.
- open 상태가 true일 때 아이콘을 45도 돌려 X자로 보여지게 한다.
- todo를 입력할 수 있는 form을 보여준다.
![todo](../img/Todo02.PNG)

## 3-2. Context API를 활용한 상태관리


## 3-3. 기능 구현하기